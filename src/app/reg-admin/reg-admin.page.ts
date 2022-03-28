import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { 
  AlertController,
  LoadingController, 
  NavController, 
  ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';
import { AngularFirestore,AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-admin',
  templateUrl: './reg-admin.page.html',
  styleUrls: ['./reg-admin.page.scss'],
})
export class RegAdminPage implements OnInit {
  user = {} as User;
  userData: any;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private afStore: AngularFirestore,
    public router: Router,
    public afs: AngularFirestore,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async register(user: User){
    if(this.formValidation()){
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Creating...",
        spinner: 'lines',
        cssClass: 'custom-loader-class'
      });
      (await loader).present();
 
      try{
        
        await this.afAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data =>
          console.log(data));
          this.SendVerificationMail();
          this.afStore.collection("admin").doc((await this.afAuth.currentUser).uid).set(user);

          //redirect to home page
          this.navCtrl.navigateRoot("login");
          this.showToast("Account Created Successfully!");
      } catch(e){
        const alert = await this.alertCtrl.create({
          header: 'Alert',
          message: e.message,
          buttons: ['OK']
        });
        await alert.present();
      }
      //dismiss loader
      (await loader).dismiss();
    }
  }

  formValidation(){
    if(!this.user.email){
      this.showToast("Enter your email");
      return false;
    }
 
    if(!this.user.password){
      this.showToast("Enter your password");
      return false;
    }

    if(!this.user.displayName){
      this.showToast("Enter your username");
      return false;
    }

    if(!this.user.phoneNumber){
      this.showToast("Enter your Phone Number");
      return false;
    }
 
    return true;
  }
 
  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: 'my-custom-class'
    }).then(toastData => toastData.present());
   }

   SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

}
