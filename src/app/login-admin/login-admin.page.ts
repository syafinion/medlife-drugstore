import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { User } from '../models/user.mode';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginAdminPage implements OnInit {
  user = {} as User;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async AdminSignIn(adminEmail: string, adminPassword: string){
    if (adminEmail == "medlife@gmail.com" && adminPassword == "admin1234" ) {
    return this.afAuth
      .signInWithEmailAndPassword(adminEmail, adminPassword)
      .then((result) => {
        this.ngZone.run(async () => {

          let loader = this.loadingCtrl.create({
            message: "Sign in successful"
            });
            (await loader).present();
            //dismiss loader
            (await loader).dismiss();
            
          this.router.navigate(['welcome-admin']);
          this.showToast("You are now logged in");
        });
      })
 
      } async error => {
    
        const alert = await this.alertCtrl.create({
          header: 'Alert',
          message: error.message,
          buttons: ['OK']
        });
        await alert.present();
  } 
  }


formValidation(){
  if(!this.user.email){
    this.showToast("Enter email");
    return false;
  }
  if(!this.user.password){
      this.showToast("Enter password");
      return false;
    }
  return true;
  }


  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      color:'success'
    }).then(toastData => toastData.present());
  }
}
