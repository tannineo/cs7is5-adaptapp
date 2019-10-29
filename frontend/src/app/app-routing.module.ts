import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import {LoginpageComponent} from "./loginpage/loginpage.component";
import {RegistrationComponent} from "./registration/registration.component"
import {HomepageComponent} from "./homepage/homepage.component"
import { from } from 'rxjs';

const appRoutes: Routes = [
  {
    path:'',
    component: LoginpageComponent
  },
  { path: 'register', 
  component: RegistrationComponent
  },
  {
    path:'home',
    component: HomepageComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
