import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ViewExpencesComponent } from './view-expences/view-expences.component';


const routes: Routes = [
  {
    path:'welcome/:id',
    component:WelcomeComponent
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'view/:id',
    component:ViewExpencesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
