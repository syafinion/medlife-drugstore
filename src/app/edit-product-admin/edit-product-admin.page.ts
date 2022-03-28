import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Product } from '../models/product.mode';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product-admin',
  templateUrl: './edit-product-admin.page.html',
  styleUrls: ['./edit-product-admin.page.scss'],
})
export class EditProductAdminPage implements OnInit {
  product = {} as Product;
  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  id: any;
  constructor(
    private afs:AngularFirestore,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute,
    private alertCtrl: AlertController
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getProductById(this.id);
  }


  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `addProducts/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`addProducts/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log("this.fb:",this.fb);

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log("url: ",url);
        }
      });
  }

  async getProductById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
   
    this.firestore.doc("products/" + id)
    .valueChanges()
    .subscribe(data => {
      this.product.id = data["id"];
      this.product.name = data["name"];
      this.product.desc = data["desc"];
      this.product.filepath = data["filepath"];
      this.product.price = data["price"];
      this.product.category = data["category"];
      this.product.stock = data["stock"];
    });
    //dismiss loader
    (await loader).dismiss();
    }

//edit product
    async updateProduct(product: Product){
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
                this.firestore.doc("products/" + this.id).update(product);
                this.firestore.doc("products/" + this.id).update({filepath: this.fb});
                this.navCtrl.navigateRoot("/listproducts");
                this.showToast("Products Updated!");
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
      if (!this.product.name){
        this.showToast("Please enter the name");
        return false;
      }
      if (!this.product.category){
        this.showToast("Please enter the category");
        return false;
      }
      if (!this.product.price){
        this.showToast("Please enter the price");
        return false;
      }
      if (!this.product.desc){
        this.showToast("Please enter the description");
        return false;
      }
      if (!this.product.stock){
        this.showToast("Please enter the stock");
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
