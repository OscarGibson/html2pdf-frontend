import { AceEditorDirective } from 'ng2-ace-editor/src/directive';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { jwtHelper } from 'angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing'
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { LoginRegisterFormComponent } from './login-register-form/login-register-form.component';
import { EnvVar } from './app.env';
import { WorkAreaComponent } from './work-area/work-area.component';
import { GlobalVariable } from './app.global';

@NgModule({
  declarations: [
    AceEditorDirective,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeContentComponent,
    LoginRegisterFormComponent,
    WorkAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [LoginRegisterFormComponent, EnvVar,
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
