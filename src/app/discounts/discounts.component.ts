import { Component, OnInit } from '@angular/core';
import {BillingService} from '../billing.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  constructor(private _billingService: BillingService) { }

  ngOnInit() {
    this.getDiscount();
  }

  isDataExist:boolean = false;
  discounts:any = [{
    enable:false, minAmount:'', maxAmount:'',
    startDate:'', endDate:'', enableDiscount:false
  }];

  addRow(){
    this.discounts.push({});
  };

  deleteRow(index){
    this.discounts.splice(index,1);
  };

  //on save function call
  saveDiscount(data){
    this.addingDiscount(data); // function call to save the data
  }

  // function call to save the data
  addingDiscount(discountData){
  console.log(discountData);
  //calling addDiscount method which is inside the billing.service to save the discounts data
    this._billingService.addDiscount(discountData).subscribe(
       data => {
         console.log('success::'+data)
         alert('saved successfully');
       },
       error => {
         alert('could not add discounts! try again!!')
       }
    );
  };
  // function call to get the Discount data
  getDiscount(){
  //calling getDiscount method which is inside the billing.service to fetch the discounts data
    this._billingService.getDiscount().subscribe(
       data => {
         console.log('success::'+data)
         if(data != null && Object.keys(data).length>0){
         alert('data::'+Object.keys(data).length)
         this.isDataExist = true
         this.discounts = data;
       } else {
       alert('eseeee')
       }
       },
       error => {
         alert('could not fetch discounts! try again!!')
       }
    );
  }

}
