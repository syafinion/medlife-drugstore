import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { ScrollDetail } from '@ionic/core';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.page.html',
  styleUrls: ['./search-order.page.scss'],
})
export class SearchOrderPage implements OnInit {
  searchTerm: any;
  orderList: any = [];
  showToolbar = false;
  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    this.firestore.collection('orders').valueChanges()
      .subscribe(val => console.log(val));
    this.orderList = await this.initializeItems();
  }

  //get the data from collection orders
  async initializeItems(): Promise<any> {
    const orderList = await this.firestore.collection('orders')
      .valueChanges()
      .pipe(first())
      .toPromise();

    return orderList;
  }

  //get the data form input searchbar
  async filterList(evt) {
    this.orderList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.orderList = this.orderList.filter(order => {
      if ((order.order_id && searchTerm) || (order.user_email && searchTerm)) {
        return (order.order_id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || order.user_email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 50;
    }
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      color:'danger'
    }).then(toastData => toastData.present());
  }
}
