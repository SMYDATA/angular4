import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {BillingService} from '../billing.service';

@Component({
  selector: 'app-select-invoice',
  templateUrl: './select-invoice.component.html',
  styleUrls: ['./select-invoice.component.css']
})
export class SelectInvoiceComponent implements OnInit {
mobile;
invoice;
userEntry;
userName;
email;
address;
invoiceData;
invoiceList;
items;
total;
subTotal;
rewards;
discounts;
BV;
rewardPoints;
credit;
discountList;
InvGen:boolean;
gst;
invoiceid;

  constructor(private _demoService: DataService,private _billingService: BillingService) {
}

  ngOnInit() {
    this.rewards =  this.discounts = 0;
    this.invoiceList = [{
      item:'', quantity:'', rate:'',total:''
    }];
    this.items = ['chair','bean','desk','sofa'];
    this.invoiceData = {name:'',mobile:'',email:''}
    this.gst = 8;
  }
  addRow(){
    this.invoiceList.push({
      item:'', quantity:'', rate:'',total:''
    });
  };

  deleteRow(index){
    this.invoiceList.splice(index,1);
  };
  calcTotal(r){
    console.log('inn')
      this.total = this.subTotal = 0;
    this.invoiceList.forEach(value => {
      if(value.rate != null && value.quantity !=null){
      this.subTotal += value.rate * value.quantity;
    };
    });
    this.total = this.subTotal - this.rewards - (this.subTotal * ((this.discounts)/100));
    this.total = this.total + (this.total * (this.gst/100));

    this.applyDiscount(this.discountList,this.total);
  }
  applyDiscount(data,total){
    if(data && data.length > 0){
      data.forEach(val => {
        if(total <= val.maxAmount && total >= val.minAmount){
          this.discounts = val.discount;
        }
      });
    }
  }
  verifyUser(){
    this._demoService.customerExist(this.mobile).subscribe(
       data => {
         if(data != null && Object.keys(data).length<=0){
         alert('no data');
           this.userEntry = true;
         }else{
          alert(' data'+data[0].userName);
         this.invoice = true;
         this.userName = data[0].userName;
         this.email = data[0].email;
         this.address = data[0].address;
         this.BV = data[0].businessVolume;
         this.rewardPoints = data[0].rewardPoints;
         this.discountList = data[0].discounts;
       }
       },
       error => {
        alert("ERROR: Could not connect!!")
       }
    );
  }

  userDetails(){
    console.log(name);
    this._demoService.createUser({userName:this.userName,email:this.email,address:this.address,userMobile:this.mobile}).subscribe(
       data => {
         alert('success');
         console.log(data)
         this.invoice = true;
         this.userName = data[0].userName;
         this.email = data[0].email;
         this.address = data[0].address;
         this.BV = data[0].businessVolume;
         this.rewardPoints = data[0].rewardPoints;
         this.discountList = data[0].discounts;
       },
       error => {
         alert('failed to add');
       }
    );
  }

  submitInvoice(){
    let generateInvoice = {
      userName:this.userName,userMobile:this.mobile,total:this.total,
      subTotal:this.subTotal,rewards:this.rewards,discount:this.discounts,
      credit:this.credit, invoiceDetail:this.invoiceList
      }
    console.log(generateInvoice);
    this._billingService.addInvoice(generateInvoice).subscribe(
      data => {
          console.log(data)
          if(data != null){
          this.invoiceid = data[0].invId;
          this.InvGen = true;
          }else{
             this.invoice = this.userEntry = false;
          }
           alert('added successfully');
        },
       error => {
         alert('could not create Invoice! try again!!')
       }
    );

  }

  imageUrl(){
    if (this.BV < 2000) {
        return "../../assets/images/bronze.jpg";
    } else if(this.BV > 2000 && this.BV < 6000){
      return "../../assets/images/imagebrnz.jpg";
    }
    else{
      return "../../assets/images/image1.jpg";
    }
  }

}
