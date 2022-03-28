import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';

@Component({
  selector: 'app-viewcustomers',
  templateUrl: './viewcustomers.page.html',
  styleUrls: ['./viewcustomers.page.scss'],
})
export class ViewcustomersPage implements OnInit {
  user = {} as User;
  id: any;
  constructor(
    private afs:AngularFirestore,
    private actRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.custDetails(this.id);
  }

  async custDetails(id:string){
    this.afs.doc("users/" + id).valueChanges().subscribe(data => {
      this.user.uid = this.id;
      this.user.email = data["email"];
      this.user.password = data["password"];
      this.user.displayName = data["displayName"];
      this.user.phoneNumber = data["phoneNumber"];
    });
    }

    async deleteUser(id: string){
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Creating...",
        spinner: 'lines',
        cssClass: 'custom-loader-class'
      });
      (await loader).present();
  
        this.alertCtrl.create({
          header: 'Confirmation!',
          message: 'Are you sure you want to delete this user?',
          buttons: [  
            {
              text: 'Yes',
              handler: () => {
                this.firestore.doc("users/" + id).delete();
                this.navCtrl.navigateRoot("/listcustomers");
                this.showToast("User Deleted");
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
        (await loader).dismiss();
      }

      showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      color:'danger'
    }).then(toastData => toastData.present());
  }

}
