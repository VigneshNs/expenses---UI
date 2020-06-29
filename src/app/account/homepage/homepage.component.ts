import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegModel } from "../registration/registration.model";
import { accountService } from '../account.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppSetting } from 'src/app/config/appSetting';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  fileToUpload: any;
  customerModel: RegModel;
  check;
  showImage: any;
  message;
  action;
  customerDetails;
  id;
  holder: RegModel;
  imageUrl;
  showImageAdd=true;
  showNoAdd = true;
  showNoError = false;
  constructor(private accountService: accountService, private snackBar: MatSnackBar,private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.imageUrl = AppSetting.customerImageUrl;
  }

  ngOnInit(): void {
    this.getCustomerDetails(this.id);
  }
  getCustomerDetails(id){
    this.accountService.getCustomerDetails(id).subscribe(data =>{
      this.customerDetails = data;
      console.log('single cus details',this.customerDetails);
    })
  
  }
 
  showNumberAdd(){
    this.showNoAdd=false;
  }
  showImageAdds(){
    this.showImageAdd=false;
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    this.customerModel = new RegModel();
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {

      this.check = reader.result;
      this.customerModel.customerName = this.fileToUpload.name;
      this.customerModel.customerImageName = this.check;
      this.showImage = this.check;
      console.log('customer image name', this.customerModel.customerImageName);
    };

    this.customerModel = this.customerModel;
  }
  uploadSingleImage() {
   
    const userId = sessionStorage.getItem('userId');
    this.accountService.uploadSingleBase64(this.customerModel, this.id).subscribe(data => {
      this.customerModel = data;
      console.log(data, 'uploaded images');
    
      this.StoreCustomerImageName(this.fileToUpload.name, this.id);
    }, error => {
      console.log(error);
    });
  }
  StoreCustomerImageName(name, id) {
    this.message = "Uploaded Successfully"
    this.customerModel = new RegModel();
    this.customerModel.customerImageName = name;
    this.accountService.StoreCustomerImageName(this.customerModel, id).subscribe(data => {
      // this.router.navigate(['cms/viewBanner']);
      this.showImageAdd = true;
      this.snackBar.open(this.message, this.action, {
        duration: 2000,
      });

    }, error => {
      console.log(error);
    });
    this.getCustomerDetails(this.id);
  }
  addNumber(num) {
    if(num.value.length === 10){
      this.showNoError= false;
      this.message = "Added Successfully"
      this.holder = new RegModel();
      this.holder.mobileNumber = num.value;
      this.accountService.addCustomerNumber(this.holder, this.id).subscribe(data => {
        if (data.length !== 0) {
          this.showNoAdd=true;
          this.snackBar.open(this.message, this.action, {
            duration: 2000
          })
        }
      })
    }else{
      this.showNoError = true;
         }
    }
   
}
