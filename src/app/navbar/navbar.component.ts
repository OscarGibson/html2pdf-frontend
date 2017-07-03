import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';

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
              private _env: EnvVar) {}

  menu:any = {
    'home': {
      'name' : GlobalVariable.innerLinks.Home.name,
      'path' : GlobalVariable.innerLinks.Home.path
    },
    'createProject' : {
      'name' : GlobalVariable.innerLinks.CreateProject.name,
      'path' : GlobalVariable.innerLinks.CreateProject.path
    }
  }
  ngOnInit() {
    this.isUserLogIn = this.IsUserLogIn()
    this.userName = localStorage.getItem('username')
    console.log('menu:',this.menu)
  }
  ngOnDestroy() {
  }

  IsUserLogIn():boolean {
    return this.LRFC.IsUserLogIn()
  }
  GetUserName() {
    return this.LRFC.GetUserName()
  }
  LogOut(event:MouseEvent):void {
    this.LRFC.LogOut()
  }


}
