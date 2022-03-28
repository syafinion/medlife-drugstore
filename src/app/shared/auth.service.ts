import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { 
  LoadingController, 
  NavController, 
  ToastController, 
AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})


export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private afStore: AngularFirestore
    )


   {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }


  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(async () => {

          let loader = this.loadingCtrl.create({
            message: "Sign in successful"
            });
            (await loader).present();
            //dismiss loader
            (await loader).dismiss();
            
          this.router.navigate(['tabs']);
          this.showToast("You are now logged in");
        });
        this.SetUserData(result.user);

        
      })
      .catch(async (error) => {
        
        const alert = await this.alertCtrl.create({
          header: 'Alert',
          message: error.message,
          buttons: ['OK']
        });
    
        await alert.present();
  })
  }


  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.router.navigate(['/login']);
        
      })
      .catch(async (error) => {

        const alert = await this.alertCtrl.create({
          header: 'Alert',
          message: error.message,
          buttons: ['OK']
        });
    
        await alert.present();
  })
  }



  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }


  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(async () => {

        let loader = this.loadingCtrl.create({
          message: "Password reset link sent. Please check your email"
          });
          (await loader).present();
          //dismiss loader
          (await loader).dismiss();

      })
      .catch(async (error) => {
        
        const alert = await this.alertCtrl.create({
          header: 'Alert',
          message: error.message,
          buttons: ['OK']
        });
    
        await alert.present();
  })
  }


  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
}


  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['tabs']);
        this.showToast("You are now logged in!");
      }
    });
  }


  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['tabs']);
          this.showToast("You are now logged in!");
        });
        this.SetUserData(result.user);
      })
      .catch(async (error) => {
        
        let loader = this.loadingCtrl.create({
          message: error.message
        });
       (await loader).present();
       //dismiss loader
       (await loader).dismiss();
      });
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber
    };
    console.log('user id: ', this.userData.uid)
    return userRef.set(userData, {
      merge: true,
    });

    
  }


  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(async () => {
      localStorage.removeItem('user');
      console.log("You are signed out");
      this.router.navigate(['']);
    });
  }


  //user must confirm if they want to sign out
  confirmSignOut() {
    this.alertCtrl.create({
      header: 'Confirm Sign out',
      message: 'Are you sure you want to sign out?',
      buttons: [  
        {
          text: 'Sign Out',
          handler: () => {
            this.SignOut();
            this.router.navigate(['welcome']);
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  
  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
   }
}