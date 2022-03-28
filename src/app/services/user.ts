import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn:'root'
})

export class AccountService{
    collectionName = 'Customer';
    constructor(
        private afStore:AngularFirestore
    ){}

    createAccount(acc,uid){
        return this.afStore.collection(this.collectionName).doc(uid).set(acc);
    }
    readAccount(id){
        return this.afStore.collection(this.collectionName).snapshotChanges();
    }
}