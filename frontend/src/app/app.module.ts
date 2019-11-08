import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import {PreferencesComponent} from './preferences/preferences.component';
import { NgMasonryGridModule } from 'ng-masonry-grid';

const routes: Routes = [
  { path: 'register',
   component: RegistrationComponent
   },
   {
     path: '',
     component: LoginpageComponent
   },
   {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'preferences',
    component: PreferencesComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginpageComponent,
    HomepageComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    NgMasonryGridModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
