import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { accountService } from '../account.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  // @ViewChild("picker") datepicker: MatDatepicker<Date>;
  @ViewChild('picker',{static:false,read:ElementRef})datepicker:ElementRef;
  expanceData:any;
expenceForm: FormGroup;
id;
  date: any;
  constructor(
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private accountService:accountService,
    private router:Router
    ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
  
  createForm(){
    this.expenceForm = this.fb.group({
      expenceDetails: this.fb.array([
        this.getUnit()
     ])
    })
   }
   private getUnit() {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      expenceName: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(numberPatern)]],
     
    });
  }
  addUnit() {
    const control = <FormArray>this.expenceForm.controls['expenceDetails'];
    control.push(this.getUnit());
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeUnit(i: number) {
    const control = <FormArray>this.expenceForm.controls['expenceDetails'];
    control.removeAt(i);
  }

  clearAllUnits() {
    const control = <FormArray>this.expenceForm.controls['expenceDetails'];
    while(control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    control.push(this.getUnit());
  }
  save(model: any, isValid: boolean, e: any) {
    // console.log(model,e);
    const data = {
      userId : this.id,
      expenceDetails : model.expenceDetails
    }
    console.log(data);
    this.accountService.createExpenceData(data).subscribe(data=>{
     console.log('expence details',data);
    })
    // e.preventDefault();
    // alert('Form data are: ' + JSON.stringify(model));
  }
  getData(e){
    console.log('date',e.target.value);
    console.log(e.date);
    console.log(this.datepicker)
    let c = this.datepicker.nativeElement.value;
    console.log(c);

  }

  onSubmit(){
    console.log((<any>this.date).format('MMMM Do YYYY'));
  }
  submitDate(e){
    console.log(e);
    const userId = this.id;
    let date = {
      date : e 
    }
    this.accountService.getSingleDateData(date,userId).subscribe(data =>{
      console.log('single day data',data);
      this.expanceData = data;
    })
  }
  submitSelectedDate(start,end){
console.log(start,end)
  }
  viewExpence(){
    this.router.navigate(['account/view',this.id]);
  }
}

