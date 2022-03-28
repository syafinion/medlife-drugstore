import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';

@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './edit-user-admin.page.html',
  styleUrls: ['./edit-user-admin.page.scss'],
})
export class EditUserAdminPage implements OnInit {
  user = {} as User;
  id: any;
  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    this.getUserById(this.id);
  }


  async getUserById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
   
    this.firestore.doc("users/" + id)
    .valueChanges()
    .subscribe(data => {
      this.user.displayName = data["displayName"];
      this.user.email = data["email"];
      this.user.phoneNumber = data["phoneNumber"];
      this.user.password = data["password"];
    });
    //dismiss loader
    (await loader).dismiss();
    }


    async updateUser(user: User){
      if(this.formValidation()) {
        //show loader
        let loader = this.loadingCtrl.create({
        message: "Please wait..."
        });
        (await loader).present();
    
        this.alertCtrl.create({
          header: 'Alert!',
          message: 'Are you sure the information submitted is correct?',
          buttons: [  
            {
              text: 'Yes',
              handler: () => {
                this.firestore.doc("users/" + this.id).update(user);
                this.navCtrl.navigateRoot("/list-users");
                this.showToast("User Updated!");
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

        //dismiss loader
        (await loader).dismiss();
        }
    }
   
    formValidation(){
      if(!this.user.displayName){
        this.showToast("Enter username");
        return false;
      }
   
      if(!this.user.email){
        this.showToast("Enter Email");
        return false;
      }
   
      if(!this.user.password){
        this.showToast("Enter Password");
        return false;
      }
   
      return true;
    }
   
    showToast (message:string){
      this.toastCtrl.create({
        message: message,
        duration: 3000,
        color: 'success'
      })
      .then(toastData => toastData.present());
    }

}
