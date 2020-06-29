import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { SignIn } from "./signin/signIn.model";
import { AppSetting } from '../config/appSetting';
import { RegModel } from './registration/registration.model';

@Injectable({
  providedIn: 'root'
})
export class accountService {
  serviceUrl: string  = AppSetting.customerServiceUrl;
  private products: string = '../../assets/data/products.json';
  invokeEvent: Subject<any> = new Subject();
  invokeEventC = this.invokeEvent.asObservable();
  constructor(private httpClient: HttpClient) { }

  callMethod() {
    return this.invokeEvent.next(true);
  }
  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.products);
  }
  signIn(data: SignIn): Observable<any> {
    const signInurl = 'customerlogin';
    const url: string = this.serviceUrl + signInurl;
    return this.httpClient.post<SignIn>(url, data);
  }
  getregForm(holder): Observable<RegModel> {
    const urlway = this.serviceUrl + 'createcustomer';
    return this.httpClient.post<RegModel>(urlway, holder);
  }
  uploadSingleBase64(data, id): Observable<any> {                                        // Retrieve All Brand
    const brandUrl = 'base64imagesingle/' + id;
    const url: string = this.serviceUrl + brandUrl;
    return this.httpClient.put<any>(url, data);
  }
  StoreCustomerImageName(data, id): Observable<any> {                          //  add Banner Image Name
    const categoryUrl = 'storecustomerimagename/';
    const url: string = this.serviceUrl + categoryUrl + id;
    return this.httpClient.put<any>(url, data);
  }
  addCustomerNumber(data, userId): Observable<any> {
    const categoryUrl = 'addCustomerNumber/';
    const url: string = this.serviceUrl + categoryUrl + userId;
    return this.httpClient.put<any>(url, data);
  }
  getCustomerDetails(id): Observable<any> {
    const customerUrl = 'getcustomerdetails/';
    const url: string = this.serviceUrl + customerUrl + id;
    return this.httpClient.get<any>(url);
  }
  createExpenceData(data):Observable<any>{
    const customerUrl = 'createexpencedata';
    const url:string = this.serviceUrl + customerUrl;
    return this.httpClient.post<any>(url,data);
  }
  getSingleDateData(data,userId):Observable<any>{
    const customerUrl = 'getsingledatedata/';
    const url:string = this.serviceUrl + customerUrl + userId;
    return this.httpClient.post<any>(url,data);
  }
}

