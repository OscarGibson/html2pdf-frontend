import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeContentComponent } from './home-content/home-content.component';
import { WorkAreaComponent } from './work-area/work-area.component';

import { GlobalVariable } from './app.global'


const appRoutes : Routes = [
  {
    path : GlobalVariable.innerLinks.Home.path,
    component : HomeContentComponent,
    data: {
      loginReq: false
    }
  },
  {
    path : GlobalVariable.innerLinks.CreateProject.path,
    component : WorkAreaComponent,
    data: {
      loginReq: true
    }
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{}
