import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { 
  LoadingController, 
  NavController, 
  ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  user = {} as User;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private afStore: AngularFirestore,
    public router: Router
  ) { }

  ngOnInit() { }

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
          this.afStore.collection("users").doc((await this.afAuth.currentUser).uid).set(user);

          //redirect to home page
          this.navCtrl.navigateRoot("login");
          this.showToast("Account Created Successfully");
      } catch(e){
        this.showToast(e);
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