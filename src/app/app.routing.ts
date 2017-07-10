import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeContentComponent } from './home-content/home-content.component';
import { WorkAreaComponent } from './work-area/work-area.component';
import { LoginRegisterFormComponent } from './login-register-form/login-register-form.component'
import { ContactUsComponent } from './contact-us/contact-us.component';

import { GlobalVariable } from './app.global'
import { AuthGuard } from './_auth/auth.service'


const appRoutes : Routes = [
  {
    path : GlobalVariable.innerLinks.Home.path,
    component : HomeContentComponent
  },
  {
    path : GlobalVariable.innerLinks.CreateProject.path,
    component : WorkAreaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: GlobalVariable.innerLinks.Auth.path,
    component: LoginRegisterFormComponent
  },
  {
    path: GlobalVariable.innerLinks.Contact.path,
    component: ContactUsComponent
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
