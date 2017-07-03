import { Component, OnInit } from '@angular/core';
import { EnvVar } from '../app.env';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  constructor(private _env: EnvVar) { }

  ngOnInit() {
  }
  startProject = {
    'name' : 'Start project',
    'path' : this._env.innerLinks['Create project']['path']
  }

}
