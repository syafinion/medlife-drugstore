import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Order } from '../models/order.mode';

@Component({
  selector: 'app-receive-details-user',
  templateUrl: './receive-details-user.page.html',
  styleUrls: ['./receive-details-user.page.scss'],
})
export class ReceiveDetailsUserPage implements OnInit {
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
      this.order.track_number=data["track_number"];
      this.order.payment=data["payment"];
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
}
