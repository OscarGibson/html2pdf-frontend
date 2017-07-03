import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Http, Headers, RequestOptions} from '@angular/http';
import { EnvVar } from '../app.env';
import { GlobalVariable } from '../app.global';


@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.css']
})
export class WorkAreaComponent implements OnInit {
  isUserLogIn: boolean;
  isToggled: boolean;
  isVertToggled: boolean;
  viewsTemplate:string = 'assets/views-area.html';
  options:any = {maxLines: 1000, printMargin: false, fontSize: 20};
  projectList:Array<any>;
  htmlText:string = "";
  cssText:string = "";
  curentProjectPk:string;
  curentProjectName:string;


  ViewsTemplateSafe() : SafeResourceUrl {
       //return this._sanitizer.bypassSecurityTrustHtml(this.viewsTemplate);
       return this._sanitizer.bypassSecurityTrustResourceUrl(this.viewsTemplate)

    }
  viewsTemplateSafe : SafeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.viewsTemplate)



  constructor(private router: Router,
    private _sanitizer: DomSanitizer,
    private http: Http,
    private _env: EnvVar) { }

  ngOnInit() {
    //console.log('test:', GlobalVariable.hostName)
    this.isToggled = false
    this.isVertToggled = false

    let postData = {
      'token' : localStorage.getItem('token')
    }

    this.http.post(GlobalVariable.documentLinks.list, postData)
    .subscribe(data => {
      if (data.json().detail == 'OK') {
        this.projectList = data.json().data
      }
    },        error => {
      console.log(error)
    })
  }
  getProjectDetail(pk) {
    let postData = {
      'token' : localStorage.getItem('token'),
      'pk' : pk
    }
    this.http.post(GlobalVariable.documentLinks.details, postData)
    .subscribe(data => {
      if (data.json().detail == 'OK') {
        this.htmlText = data.json().data['html']
        this.cssText = data.json().data['css']
        //localStorage.setItem('curentProject',data.json().data['pk'])
        this.curentProjectPk = data.json().data['pk']
        this.curentProjectName = data.json().data['name']
      }
    },         error => {
        console.log(error)
    })
  }
  ToggleRightNav() {
    this.isToggled = !this.isToggled
  }
  IsToggled() {
    return this.isToggled
  }
  ToggleVertPanel() {
    this.isVertToggled = !this.isVertToggled
  }
  IsVertToggled() {
    return this.isVertToggled
  }
  runHtml(iframe:HTMLFrameElement, htmlText:string, cssText:string) {
    let document = iframe.contentDocument
    document.getElementById('innerStyle').innerHTML = cssText
    document.getElementById('content').innerHTML = htmlText
  }
  changeArea(event:MouseEvent) {
    let currentTarget = <HTMLElement>event.currentTarget
    let targetName = currentTarget.attributes['target'].value

    let AllEl = document.getElementsByClassName('work-area')
    let AllTabs = document.getElementsByClassName('right-nav-button')

    var list: Array<Element>
    for (let i = 0; i<AllEl.length && i<AllTabs.length; i++) {
      AllEl[i].classList.add('area-inactive')
      //AllTabs[i].classList.remove('active')
    }
    //currentTarget.classList.add('active')
    let targetEl = document.getElementById(targetName)
    if (targetEl) {
      targetEl.classList.remove('area-inactive')
    }
  }
  NewProject() {
    var name = prompt("Enter project name", "new project");
    if (name == null) {
        name = 'new project'
    }
    let postData = {
      'name': name,
      'token': localStorage.getItem('token')
    }
    this.http.post(GlobalVariable.documentLinks.create, postData)
    .subscribe(data => {
      window.location.reload()
    },         error => {
      console.log(error)
    })
  }

  SaveProject() {
    if (localStorage.getItem('curentProject')) {

    }

    let postData = {
      'name': this.curentProjectName,
      'pk': this.curentProjectPk,
      'html': this.htmlText,
      'css': this.cssText,
      'token': localStorage.getItem('token')
    }
    this.http.post(GlobalVariable.documentLinks.update, postData)
    .subscribe(data => {
      console.log(data.json())
    },         error => {
      console.log(error)
    })
  }

  DownloadProject() {
    if (localStorage.getItem('curentProject')) {

    }

    let postData = {
      'name': this.curentProjectName,
      'html': this.htmlText,
      'css': this.cssText,
      'token': localStorage.getItem('token')
    }
    this.http.post(GlobalVariable.documentLinks.download, postData)
    .subscribe(data => {
      console.log(data)
      let pdf = new Blob([data.text()], {type: 'application/pdf'});
      let dataLocalUrl = this._sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(pdf))
      let simpleUrl = window.URL.createObjectURL(pdf)
      console.log(dataLocalUrl)
      window.open(simpleUrl, '_blank')
    },         error => {
      console.log(error)
    })
  }

}
