import { Component, OnInit ,} from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {SignIn} from './signIn.model';
import { Router } from '@angular/router';
import {accountService} from '../account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  submitted=false;
  signInModel: SignIn;
  pwdError =false;
  showPassword = false;
  message;
  action;
  id: any;
  constructor(private fb:FormBuilder,private accountService:accountService,private router:Router,private snackBar:MatSnackBar) { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.signInForm = this.fb.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required],
      // mobileNumber: ['']
    });
  
  }
onSubmit() {
  this.submitted = true;
  this.message = "Login Successfully"
  this.signInModel = new SignIn();
  this.signInModel.emailId = this.signInForm.controls.emailId.value;
  this.signInModel.password = this.signInForm.controls.password.value;
  this.accountService.signIn(this.signInModel).subscribe(data => {
    console.log(data);
    if (data.length === 0) {
     this.pwdError = true;
     sessionStorage.setItem('login', 'false');
     sessionStorage.removeItem('userId');
    } else {
     
      console.log(data);
      this.id = data[0]._id
      sessionStorage.setItem('login', 'true');
      sessionStorage.setItem('userId', data[0].userId);
      sessionStorage.setItem('emailId', data[0].emailId);
      this.snackBar.open(this.message,this.action,{
        duration:2000
      })
      this.router.navigate(['account/welcome/',this.id]);
     
    }
  });
}
signup(){
  this.router.navigate(['account/register'])
}
checkPassword() {
  this.showPassword = !this.showPassword;
}
}
