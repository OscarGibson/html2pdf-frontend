import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';

import { Router } from '@angular/router';

import { LoginRegisterFormComponent } from
'../login-register-form/login-register-form.component';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EnvVar } from '../app.env';
import { GlobalVariable } from '../app.global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isUserLogIn: boolean;
  userName: string;
  constructor(private LRFC:LoginRegisterFormComponent,
              private _env: EnvVar,
              private router: Router) {}

  menu:any = {
    'home': {
      'name' : GlobalVariable.innerLinks.Home.name,
      'path' : GlobalVariable.innerLinks.Home.path
    },
    'createProject' : {
      'name' : GlobalVariable.innerLinks.CreateProject.name,
      'path' : GlobalVariable.innerLinks.CreateProject.path
    },
    'contactUs' : {
      'name' : GlobalVariable.innerLinks.Contact.name,
      'path' : GlobalVariable.innerLinks.Contact.path
    }
  }
  ngOnInit() {
    this.isUserLogIn = this.IsUserLogIn()
    this.userName = localStorage.getItem('username')
  }
  ngOnDestroy() {
  }

  IsUserLogIn():boolean {
    let isUserLogIn:string = localStorage.getItem('isUserLogIn')
    if (isUserLogIn == 'true') {
      return true
    }
    if (isUserLogIn == 'false') {
      return false
    }
  }
  GetUserName() {
    return localStorage.getItem('username')
  }
  LogOut(event:MouseEvent):void {
    this.LRFC.LogOut()
  }
  LogIn() {
    this.router.navigate([GlobalVariable.innerLinks.Auth.path],{})
  }


}
