import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Order } from '../models/order.mode';

@Component({
  selector: 'app-order-details-admin',
  templateUrl: './order-details-admin.page.html',
  styleUrls: ['./order-details-admin.page.scss'],
})
export class OrderDetailsAdminPage implements OnInit {
  order = {} as Order;
  id: any;
  item = [];
  qty = [];
  constructor(
    private actRoute: ActivatedRoute,
    private afs:AngularFirestore,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    this.viewDetails(this.id);
  }

  async viewDetails(id:string){
    this.afs.doc("orders/" + id).valueChanges().subscribe(data => {
      this.order.delivery_address = data["delivery_address"];
      this.item = data["item"];
      this.qty = data["item_qty"];
      this.order.order_id= data["order_id"];
      this.order.order_status= data["order_status"];
      this.order.sub_total= data["sub_total"];
      this.order.time= data["time"];
      this.order.total= data["total"];
      this.order.user_email= data["user_email"];
      this.order.user_id= data["user_id"];


      console.log("this.item:", this.item);
      console.log("qty", this.qty[0].qty);
      console.log("name", this.item[0].name);
    });
  }

  async deletePost(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Creating...",
      spinner: 'lines',
      cssClass: 'custom-loader-class'
    });
    (await loader).present();

      this.alertCtrl.create({
        header: 'Confirmation!',
        message: 'Are you sure you want to cancel the order?',
        buttons: [  
          {
            text: 'Yes',
            handler: () => {
              this.firestore.doc("orders/" + id).delete();
              this.navCtrl.navigateRoot("list-orders");
              this.showToast("Order Deleted");
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

    async getTrack(id: string) {
      let loader = this.loadingCtrl.create({
        message: "Creating...",
        spinner: 'lines',
        cssClass: 'custom-loader-class'
      });
      (await loader).present();
  
        this.alertCtrl.create({
          header: 'Alert!',
          message: 'Insert Tracking Number',
          inputs: [
            {
              name: 'track_number',
              placeholder: 'Title',
            },
          ],
          buttons: [  
            {
              text: 'Save',
              handler: data => {
                this.firestore.doc("orders/" + id).update({
                  order_status:"To receive",
                track_number: data});
                this.navCtrl.navigateRoot("/list-orders");
                this.showToast("Item Post");
              }
            },
            {
              text: 'Cancel',
              handler: data => {
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
        color: 'danger'
      }).then(toastData => toastData.present());
    }

}
