import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.page.html',
  styleUrls: ['./welcome-admin.page.scss'],
})
export class WelcomeAdminPage implements OnInit {
  uid: String;
  user = {} as User;
  constructor(
    private afAuth:AngularFireAuth,
    private afStore: AngularFirestore,
    private platform: Platform,
    public router:Router,
    public authService: AuthService,
    public afs: AngularFirestore // Inject Firestore service
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  async getInfo() {
    //getting current user uid
    this.uid = (await this.afAuth.currentUser).uid;
    console.log(this.uid);

    //getting current user's basic info
    this.afs
      .doc(( "admin/" + this.uid))
      .valueChanges()
      .subscribe((data) => {
        this.user.email=data['email'];
        this.user.displayName=data['displayName'];
      });
    }

}
