import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CheckoutPage } from '../checkout/checkout.page';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  products = [];

  constructor(private productService: ProductService, private modalCtrl: ModalController,
    private alertCtrl: AlertController) { }



  ngOnInit() {
    const cartItems = this.productService.cart.value;
    console.log('cart: ', cartItems );


    this.productService.getProducts().pipe(take(1))
    .subscribe(allProducts => {
      this.products = allProducts.filter(p => cartItems[p.id])
      .map(product => {
        return {...product, count: cartItems[product.id]};
      });

      console.log('products: ', this.products);
    });
  }

  close(){
    this.modalCtrl.dismiss();
  }


  async checkout(){

    const modal = await this.modalCtrl.create({
      component: CheckoutPage
    });
    await modal.present();

    // await alert.present();

  }
}
