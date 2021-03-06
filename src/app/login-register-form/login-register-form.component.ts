import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { LocationStrategy } from '@angular/common';

import { LoginForm } from '../loginForm.model';
import { RegisterForm } from '../registerForm.model';

import { EnvVar } from '../app.env';
import { GlobalVariable } from '../app.global';

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.css']
})
@Injectable()
export class LoginRegisterFormComponent implements OnInit, OnDestroy {
  private req: any;
  private returnUrl:string = GlobalVariable.innerLinks.Home.path;

  loginFormModel = new LoginForm('','')
  registerFormModel = new RegisterForm('','','','','','')

  constructor(private http: Http, private _env: EnvVar,
  private route: ActivatedRoute,
  private router: Router
  ) { }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        if (params['returnUrl']) {
          this.returnUrl = params['returnUrl']
        }
      });

    let uname = localStorage.getItem('username')
    let token = localStorage.getItem('token')
    if (token) {
      this.req = this.LoginByToken(token)
    }
    else {
      console.log('token not exist')
    }

  }
  ngOnDestroy() {
    this.req.unsubscribe()
  }

  GetUserName():string {
    return localStorage.getItem('username')
  }
  LoginByUserName(form: NgForm) {
    let username = form.value['username']
    let password = form.value['password']

    if (username && password) {
      let postData = {
        'username' : username,
        'email' : '',
        'password' : password
      }

      this.req = this.http.post(GlobalVariable.getJsonLink('login'), postData)
      .subscribe(data => {
        localStorage.setItem('token',data.json().key)
        //window.location.reload()
        this.LoginByToken(data.json().key)
      },         error => {
        console.log('error:',error)
      })
    }
  }

  LoginByToken(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Token ' + token)

    console.log('token',token)

    let options = new RequestOptions({
      headers: headers
    });

    this.req = this.http.get(GlobalVariable.getJsonLink('loginByToken'), options)
    .subscribe(response => {
      //this.userName = response.json().username
      localStorage.setItem('username',response.json().username)
      localStorage.setItem('isUserLogIn','true')
      this.router.navigate([this.returnUrl],{})
      return response.json()
    },         error => {
      localStorage.setItem('isUserLogIn','false')
      console.log('false error',error)
      return error
    },        () => {
      //console.log('true completed')
    })
    console.log('req:',this.req)
  }
  LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('isUserLogIn')
    localStorage.removeItem('username')
    window.location.reload()
  }
  Register(form: NgForm) {
    let login = form.value['login']
    let email = form.value['email']
    let password = form.value['passw']
    let passwordConfirm = form.value['passwrepeat']

    let postData = {
      'username' : login,
      'password1' : password,
      'password2' : passwordConfirm,
      'email' : email
    }

    this.req = this.http.post(GlobalVariable.getJsonLink('register'), postData)
    .subscribe(data => {
      localStorage.setItem('token',data.json().key)
      window.location.reload()
    },         error => {
      console.log(error)
    })

  }

  FormsTabShow(event: MouseEvent) {
    let currentTarget = <HTMLElement>event.currentTarget
    let targetName = currentTarget.attributes['target'].value
    let AllEl = document.getElementsByClassName('forms-boxes')
    let AllTabs = document.getElementsByName('nav-tab-button')
    var list: Array<Element>
    for (let i = 0; i<AllEl.length && i<AllTabs.length; i++) {
      AllEl[i].classList.add('form-inactive')
      AllTabs[i].classList.remove('active')
    }
    currentTarget.classList.add('active')
    let targetEl = document.getElementById(targetName)
    if (targetEl) {
      targetEl.classList.remove('form-inactive')
    }

  }

}
