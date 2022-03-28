import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Product } from '../models/product.mode';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  product = {} as Product;
  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor( 
    private afs:AngularFirestore,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,) { }

  ngOnInit() {
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

  
  async addProduct(product: Product){

    if(this.formValidation()){
      //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
      });
      (await loader).present();
  
   const products = this.afs.collection('products').add(product);

   //add id to book
   const booksId = (await products).id;
   await this.afs.collection('products').doc(booksId).update({
    id: booksId,
    filepath:this.fb,
  });

  //dismiss loader
  (await loader).dismiss();
  this.showToast("Product Added Successfully")
  this.navCtrl.navigateRoot("listproducts");

}else {
  this.showToast("Please complete the form");

}
  }


  //check to see if user has entered their address or not
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
    duration: 3000
    })
    .then(toastData => toastData.present());
    }
  

}
