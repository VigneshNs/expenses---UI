import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { accountService } from '../account.service';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement{
expeceName:string,
amount:number
} 
@Component({
  selector: 'app-view-expences',
  templateUrl: './view-expences.component.html',
  styleUrls: ['./view-expences.component.css']
})
export class ViewExpencesComponent implements OnInit {
userId;
expenceData:any;
expenceshow=[];
showDateData =false;
showByDateRange = false;
showByMonth =false;
showNoData =false ;
showNoRecord = false;
displayedColumns: string[] = ['Date','Expences'];
  result: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private accountService:accountService
  )
   {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
    });
   }

  ngOnInit(): void {
  }
  viewByDate(){
    if(!this.showDateData){
      this.showDateData =true;

    }else{
      this.showDateData =false;

    }

  }
  viewByMonth(){

  }
  viewByDateRange(){

  }
  submitDate(e){
    console.log(e);
    const userId = this.userId;
    let date = {
      date : e 
    }
    this.accountService.getSingleDateData(date,userId).subscribe(data =>{
      if(data.length === 0){
        this.expenceshow = [];
        this.result = "NO RECORDS FOUND";
        console.log(this.result);
      }else{
        this.expenceshow = data;
        this.result = "";
        this.expenceData =  new MatTableDataSource<PeriodicElement>(data);
      }
    })
  }

}
