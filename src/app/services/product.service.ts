import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@capacitor/storage';
import firebase from 'firebase/compat/app';
import { AuthService } from '../shared/auth.service';


//ensure can easily retrieve info
const CART_STORAGE_KEY = 'MY_CART';

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  cart = new BehaviorSubject({});
  productsCollection: AngularFirestoreCollection;
  cartKey = null;
  

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.productsCollection = this.afs.collection('products');
    this.loadCart();
    
   }


   getProducts(){
     return this.productsCollection.valueChanges( { idField: 'productId'});
     
   }

   async loadCart() {
    const result = await Storage.get( {key: CART_STORAGE_KEY});
    console.log('Cart from storage: ', result);
    
  

    if (result.value) {
      //already have a cart
      this.cartKey = result.value
      this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) =>{
        delete result['lastUpdate'];
        console.log('Cart changed: ', result);
        this.cart.next(result || {});
      });

    } else {

      //'carts' collection 
      const fbDocument = await this.afs.collection('carts').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log('new cart: ', fbDocument);
      this.cartKey = fbDocument.id;
      await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey});
    }
   }


   addToCart(id){

    //update
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Update the stock value of the product
  this.productsCollection.doc(id).update({
    stock: DECREMENT
  });
   }


   removeFromCart(id){
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: DECREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Update the stock value of the product
  this.productsCollection.doc(id).update({
    stock: INCREMENT
  });
   }


   async checkoutCart(post, subTotal, total,  productNames, productImages, quantity) {
    const orders = this.afs.collection('orders').add({
      user_id: this.authService.userData.uid,
      user_email: this.authService.userData.email,
      item : [{
        image: productImages,
        name: productNames
      }],
      item_qty:quantity,
      item_id: this.cart.value, 
      delivery_address: post,
      payment: post,
      sub_total: subTotal,
      total: total,
      order_status:"To ship",
      time: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    
    //this is to add the id into the document 
    const orderId = (await orders).id
      await this.afs.collection('orders').doc(orderId).update({
        order_id: orderId
      });

      console.log("added to orders collection ");
    

    this.afs.collection('carts').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

   }

}
