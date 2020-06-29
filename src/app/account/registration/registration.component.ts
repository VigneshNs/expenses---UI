import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {accountService} from '../account.service';
import { Router } from '@angular/router';
import {RegModel } from "./registration.model";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
regForm:FormGroup;
holder;
text = 'registeredCustomer';
showPassword = false;
message;
action;
  constructor(private fb:FormBuilder,private accountService:accountService,private router:Router,private snackBar:MatSnackBar) {
    this.createRegForm();
   }

  ngOnInit(): void {
  }
  createRegForm() {
    this.regForm = this.fb.group({
      emailId: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // mobileNumber: ['']

    });
  }

  onRegister() {
    this.holder = new RegModel();
    this.message = "Registered Successfully"
    this.holder.emailId = this.regForm.controls.emailId.value;
    // this.holder.mobileNumber = this.regForm.controls.mobileNumber.value;
    this.holder.password = this.regForm.controls.password.value;
    this.holder.createdBy = this.text;
    this.accountService.getregForm(this.holder).subscribe(data => {
      if (data.result) {
        this.holder = data;
      } else {
        sessionStorage.setItem('login', 'true');
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('lastLoginBy', data.lastLoginBy);
        this.snackBar.open(this.message,this.action,{
          duration:2000
        })
        this.router.navigate(['account/signin']);
       
      }
    }, error => {
      console.log(error);
    });
    /* console.log(this.regForm); */
  } 
  login()   {
    this.router.navigate(['account/signin'])
  }
  checkPassword() {
    this.showPassword = !this.showPassword;
  }
}
