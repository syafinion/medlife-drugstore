import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { Order } from '../models/order.mode';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.page.html',
  styleUrls: ['./list-orders.page.scss'],
})
export class ListOrdersPage implements OnInit {
  ordersCollection: AngularFirestoreCollection;
  public orders : Observable<any[]>;
  public ToShip : Observable<any[]>;
  public receive : Observable<any[]>;
  public comp : Observable<any[]>;

  constructor(
    private afs:AngularFirestore,
    private authService:AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController
    
  ) {
    this.ordersCollection = this.afs.collection('orders');
   }

  ngOnInit() {
    this.orders = this.afs.collection('orders').valueChanges( { idField: 'order_id'});
    console.log(this.orders)
    this.getToShipOrders();
    this.getReceiveOrders();
    this.getComp();
  }

  getToShipOrders(){
    const queryObservable = this.orders.pipe(
      switchMap(() => 
        this.ToShip = this.afs.collection('orders', ref => ref.where('order_status', '==', 'To ship')).valueChanges()
      
        )
    );
  
    // subscribe to changes
    queryObservable.subscribe(data => {
    console.log("to ship items:", data);  
    
    });
  }


  getReceiveOrders(){
    const queryObservable = this.orders.pipe(
      switchMap(() => 
        this.receive = this.afs.collection('orders', ref => ref.where('order_status', '==', 'To receive')).valueChanges()
      
        )
    );
  
    // subscribe to changes
    queryObservable.subscribe(data => {
    console.log("to receive items:", data);  
    
    });
  }

  getComp(){
    const queryObservable = this.orders.pipe(
      switchMap(() => 
        this.comp = this.afs.collection('orders', ref => ref.where('order_status', '==', 'Completed')).valueChanges()
      
        )
    );
  
    // subscribe to changes
    queryObservable.subscribe(data => {
    console.log("to Completed items:", data);  
    
    });
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: 'danger'
    }).then(toastData => toastData.present());
  }
}
