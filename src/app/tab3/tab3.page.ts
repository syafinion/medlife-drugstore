import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { AlertController, Animation, AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page implements OnInit, AfterViewInit {
  products: Observable<any[]>;

  @ViewChild('myfab', {read: ElementRef}) cartBtn: ElementRef;
  cartAnimation: Animation; 
  cart = {};

  constructor(private productService: ProductService, private animationCtrl: AnimationController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    this.products= this.productService.getProducts();
    
    this.productService.cart.subscribe(value => {
      console.log('MY CART NOW: ', value);
      this.cart = value;
    });
  }
  

  ngAfterViewInit(): void {
      this.cartAnimation = this.animationCtrl.create('cart-animation');
      this.cartAnimation.addElement(this.cartBtn.nativeElement).keyframes([
        { offset:0, transform: 'scale(1)'},
        { offset:0.5, transform: 'scale(1.2)'},
        { offset:0.8, transform: 'scale(0.9)'},
        { offset:1, transform: 'scale(1)'}
      ])
      .duration(300)
      .easing('ease-out');
  }


  addToCart(event: { stopPropagation: () => void; }, product: { id: any; }) {
    event.stopPropagation();
    this.productService.addToCart(product.id);
    this.cartAnimation.play();
  }


  removeFromCart(event: { stopPropagation: () => void; }, product: { id: any; }) {
    event.stopPropagation();
    this.productService.removeFromCart(product.id);
    this.cartAnimation.play();
  }

  async openCart() {

    console.log("this.cart: ", this.cart);


    //the problem is this is not empty, there is still product id but it is 0
    if (this.cart == null){
      //gives alert
      const alert = await this.alertCtrl.create({
       message: 'There are no orders, please select products into the cart',
       buttons: ['OK']
       
     });

     await alert.present();
     
    } else{
 
      const modal = await this.modalCtrl.create({
        component: CartModalPage
      });
      await modal.present();

   }

  }
}