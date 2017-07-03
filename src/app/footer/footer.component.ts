import { Component, OnInit } from '@angular/core';
import { EnvVar } from '../app.env';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _env: EnvVar) { }

  ngOnInit() {
  }
  menu = {
    'home': {
      'name' : this._env.innerLinks['Home']['name'],
      'path' : this._env.innerLinks['Home']['name']
    },
    'createProject' : {
      'name' : this._env.innerLinks['Create project']['name'],
      'path' : this._env.innerLinks['Create project']['path']
    },
  }

}
