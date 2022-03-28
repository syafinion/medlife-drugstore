import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { ScrollDetail } from '@ionic/core';

@Component({
  selector: 'app-search-product-admin',
  templateUrl: './search-product-admin.page.html',
  styleUrls: ['./search-product-admin.page.scss'],
})
export class SearchProductAdminPage implements OnInit {
  searchTerm: any;
  productList: any = [];
  showToolbar = false;
  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  }

  async initializeItems(): Promise<any> {
    const productList = await this.firestore.collection('products')
      .valueChanges()
      .pipe(first())
      .toPromise();

    return productList;
  }

  async filterList(evt) {
    this.productList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.productList = this.productList.filter(product => {
      if (product.name && searchTerm) {
        return (product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || product.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || product.filepath.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  
onScroll($event: CustomEvent<ScrollDetail>) {
  if ($event && $event.detail && $event.detail.scrollTop) {
    const scrollTop = $event.detail.scrollTop;
    this.showToolbar = scrollTop >= 50;
  }
}
}
