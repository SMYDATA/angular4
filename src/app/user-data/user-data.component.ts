import { Component ,Input,Output, OnChanges } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent  {

showRegForm:boolean;
addNewBusinessForm:any;
showeditForm:boolean;
businessList:any;
showbusinessList:boolean;

  constructor(private _demoService: DataService, private router: Router, private cookieService: CookieService) { }
  ngOnInit() {
    this._demoService.newBusinessVal.subscribe(newBusinessVal => this.addNewBusinessForm = newBusinessVal);
     this.showRegForm = this.addNewBusinessForm;
  }
addNewBusiness(){
  this.showeditForm = false;
 this._demoService.isNewBusiness(true);
 this.showRegForm = this.addNewBusinessForm;
}
viewBusinessDetails(data){
  this.showRegForm = false;
  this._demoService.isNewBusiness(false);
  let model=data
  this._demoService.editBusinessData(model);
  this.showeditForm = true;
  this.showbusinessList = false;
}
showBuList(){
  this.showbusinessList = true;
  this._demoService.viewMyBusiness().subscribe(
     data => {
       console.log('showBuList::'+data)
       this.businessList = data;
     },
     error => {
    
     }
  );
}

}
