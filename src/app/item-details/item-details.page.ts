import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Product } from '../models/product.mode';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit{
  
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
    private modalCtrl: ModalController) { 
      this.id = this.actRoute.snapshot.paramMap.get("id");
    }


    ngOnInit(){
      this.viewDetails(this.id);
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
      
      addToCart(event: { stopPropagation: () => void; }, product: { id: any; }) {
        event.stopPropagation();
        this.productService.addToCart(this.product.id);
        this.cartAnimation.play();
      }

      async openCart() {
        const modal = await this.modalCtrl.create({
          component: CartModalPage
        });
        await modal.present();
      }
    

    }