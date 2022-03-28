import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Post } from '../models/post.mode';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Tab4Page } from '../tab4/tab4.page';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})


export class CheckoutPage implements OnInit {


  post = {} as Post;
  products = [];
  productNames = [];
  productImages = [];
  public quantity = [];
  public subTotal = this.getSubTotal(); //subtotal for all the products
  public total = this.getTotal();
  

  constructor(private productService: ProductService, 
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }


    ngOnInit() {
      const cartItems = this.productService.cart.value;
      console.log('cart: ', cartItems );

      const obj = cartItems;
      this.quantity = Object.keys(obj).map(key => 
        ({item_id:key,
        qty: obj[key]
      })
      );
  
      this.productService.getProducts().pipe(take(1))
      .subscribe(allProducts => {
        this.products = allProducts.filter(p => cartItems[p.id])
        .map(product => {
          return {...product, count: cartItems[product.id]};
        });
        
        //get item images and names
        for (let i=0; i < this.products.length; i++){
          this.productNames[i] = this.products[i].name;
          this.productImages[i] = this.products[i].filepath;
        }
        console.log('products: ', this.products);
        
      });
    }


    close(){
      this.modalCtrl.dismiss();
    }
    

    //get subtotal
    getSubTotal(){
      
      this.subTotal = 0;
      for (let p of this.products){
        this.subTotal += p.price * p.count;
      }
      
      return this.subTotal;
      
    }

  
    //get total, with tax of 10%
    getTotal(){
      this.total = (this.subTotal + (this.subTotal * (10/100)));
      
      return this.total;
    }
    

    async confirmCheckout(){

      if(this.formValidation()){
        this.productService.checkoutCart(this.post, this.subTotal, this.total, this.productNames, this.productImages, this.quantity);
     
      //opens receipt page
      const modal = await this.modalCtrl.create({
      component: Tab4Page
        });
      await modal.present();
      
      //gives alert
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Thanks for ordering',
        buttons: ['Continue shopping']
        
      });
      await alert.present();

    //if user has not entered their address
    }
  }

    //check to see if user has entered their address or not
    formValidation(){
      if (!this.post.address){
        this.showToast("Please enter your address");
        return false;
      }
      if (!this.post.payment){
        this.showToast("Please enter your payment method");
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
  