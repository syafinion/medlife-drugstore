import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Product } from '../models/product.mode';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { AlertController, Animation, AnimationController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-item-details-admin',
  templateUrl: './item-details-admin.page.html',
  styleUrls: ['./item-details-admin.page.scss'],
})
export class ItemDetailsAdminPage implements OnInit {
  product = {} as Product;
  id: any;
  products: Observable<any[]>;

  @ViewChild('myfab', {read: ElementRef}) cartBtn: ElementRef;
  cartAnimation: Animation; 
  cart = {};
  constructor(
    private actRoute: ActivatedRoute, 
    private afs:AngularFirestore,
    private productService: ProductService, private animationCtrl: AnimationController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    this.viewDetails(this.id);
  }


  async viewDetails(id:string){
    this.afs.doc("products/" + id).valueChanges().subscribe(data => {
      this.product.id = data["id"];
      this.product.name = data["name"];
      this.product.category = data["category"];
      this.product.price = data["price"];
      this.product.filepath = data["filepath"];
      this.product.filepath2 = data["filepath2"];
      this.product.desc = data["desc"];
      this.product.stock = data["stock"];
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
          message: 'Are you sure you want to delete?',
          buttons: [  
            {
              text: 'Yes',
              handler: () => {
                this.firestore.doc("products/" + id).delete();
                this.navCtrl.navigateRoot("listproducts");
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

      showToast (message:string){
        this.toastCtrl.create({
          message: message,
          duration: 3000,
          color: 'danger'
        }).then(toastData => toastData.present());
      }

}
