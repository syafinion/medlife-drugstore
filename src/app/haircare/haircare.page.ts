import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-haircare',
  templateUrl: './haircare.page.html',
  styleUrls: ['./haircare.page.scss'],
})
export class HaircarePage implements OnInit {
  products: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  async getProducts(){
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();
    try {
      this.firestore
      .collection('products', ref => ref.where('category', '==', 'Shampoo'))
      .snapshotChanges()
      .subscribe(data => { 
        this.products = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()["name"],
            category: e.payload.doc.data()["category"],
            filepath: e.payload.doc.data()["filepath"],
            price: e.payload.doc.data()["price"]
          };
        });
  
        loader.dismiss();
      });
      
      } catch(e){
      this.showToast(e);
  
      }
    }
    showToast (message:string){
      this.toastCtrl.create({
        message: message,
        duration: 3000
      }).then(toastData => toastData.present());
    }

}
