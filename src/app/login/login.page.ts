import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {AfterContentInit, ContentChild, Directive} from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  showPassword = false;
  @ContentChild(IonInput) input: IonInput;
  constructor(
    public authService: AuthService
  ) { }


  ngOnInit() { 

  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
  
}