import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { ScrollDetail } from '@ionic/core';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {
  searchTerm: any;
  userList: any = [];
  showToolbar = false;
  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  async ngOnInit() {
    this.firestore.collection('users').valueChanges()
      .subscribe(val => console.log(val));
    this.userList = await this.initializeItems();
  }
  
  async initializeItems(): Promise<any> {
    const userList = await this.firestore.collection('users')
      .valueChanges()
      .pipe(first())
      .toPromise();

    return userList;
  }



  async filterList(evt) {
    this.userList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.userList = this.userList.filter(user => {
      if ((user.displayName && searchTerm) || (user.email && searchTerm)) {
        return (user.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
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
