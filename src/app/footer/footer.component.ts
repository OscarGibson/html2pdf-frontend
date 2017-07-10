import { Component, OnInit } from '@angular/core';
import { EnvVar } from '../app.env';
import { GlobalVariable } from '../app.global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _env: EnvVar) { }

  ngOnInit() {
  }
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

}
