import { Component  } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {UserDataComponent} from '../user-data/user-data.component'
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    categoryInfo = [{
            name: 'Clothing',
            id: '1'
        },
        {
            name: 'Furniture',
            id: '2'
        },
        {
            name: 'Fashion jewellery',
            id: '3'
        },
        {
            name: 'Valves',
            id: '4'
        },
        {
            name: 'Computer Hardware',
            id: '5'
        },
    ];
    registerInfo = [{
            name: 'PanCard',
            id: '1'
        },
        {
            name: 'Aadhar',
            id: '2'
        },
        {
            name: 'LabourId',
            id: '3'
        },
        {
            name: 'TIN',
            id: '4'
        },
        {
            name: 'RegId',
            id: '5'
        },
    ];

    submitted = false;
    showAddr = false;
    registrationFailed =null;
    latlng:any;
    mobileOTP:any;
    addNewBusinessForm:boolean;
    formSubmitName:String = 'Register';
    formTitle : String = 'Registration Form';
    businessEditableForm:any;
    addNew:boolean;
    mobilecheck:boolean;
    patternErr:string;
    showbusinessList:boolean;
    businessList:any;
    public pattern_email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    public pattern_mobile = /([0-9]){10}/g;
    public pattern_pinCode = /([0-9]){6}/g;
    public pattern_password = /([0-9a-zA-Z]){6,20}/g;

    public model={"companyName":"","ownerName":"","mobile":"","password":"","email":"","businessAddress":"","pinCode":"","city":"","state":"","country":"","website":"","category":"","regProof":"","reg":""};

    constructor(private _demoService: DataService, private router: Router,
    private toastr:ToastsManager) {
         }
    ngOnInit() {
      //alert(this.router.url)
      let url = this.router.url;
      this.addNewBusinessForm = url.includes('addNew');
      this.businessEditableForm = url.includes('myInfo');

      console.log('add:'+this.addNewBusinessForm);
      console.log('edit:'+this.businessEditableForm)
      if (this.addNewBusinessForm) {
          this.formSubmitName = 'Add Business';
          this.formTitle = 'Add New Business';
          this.addNew = true;
      }else if (this.businessEditableForm) {
          this.showBuList();
      } else {}
      console.log('newBusinessVal::'+this.addNewBusinessForm);
    }

    validation(check,value){
      console.log("invalidation method:"+check+":"+value)
      if (!this[check].test(value)) {
              this.model[check.slice(8)] = '';
              this.toastr.error("Please enter valid "+ check.slice(8), null,{toastLife: '3000'});
              //this.toastr.error("Please enter valid "+ check.slice(8), null,{dismiss: 'click'});
        }
      }

    onSubmit() {
      if (this.addNewBusinessForm) {
          console.log('newBusinessVal::'+this.addNewBusinessForm);
          console.log(this.model)
            console.log('addNew comp.ts')
      this.addNewBusiness(this.model)
    }else if(this.businessEditableForm){
      console.log(this.model)
        console.log('edit comp.ts')
      this.editBusiness(this.model)
    }else{
      this.registerUser(this.model);
      console.log('register comp.ts')
      console.log(JSON.stringify(this.model));
      }
      this.getLocation();
    }
    update(value: string) {
        if (value != null)
            this.addressDetails(value)
    }

    locDeatils(data){
      if (data) {
        var addrDataArr= data.results[0].formatted_address.split(',');
          this.model['country'] = addrDataArr[addrDataArr.length - 1].trim();
          this.model['state'] = addrDataArr[addrDataArr.length - 2].trim();
          this.model['city'] = addrDataArr[addrDataArr.length - 3].trim();
          this.showAddr = true;
      }
    }

    registerUser(dataJson) {
          this.mobileOTP = dataJson.mobile;
        this._demoService.registerUser(dataJson).subscribe(
            data => {
                console.log(data)
                  console.log("Data saved successfully!");
                  if (data[0] == 'success') {
                    this.sendOtp(  this.mobileOTP )
                    return true;
                  }else{
                    this.toastr.error(data[0], 'Error',{toastLife: '5000'});
                  }
            },
            error => {
                console.error("Error saving data!");
                this.registrationFailed = 'Registration failed';
                this.toastr.error('Registration failed', 'Error',{toastLife: '5000'});
                return Observable.throw(error);
            }
        );
    }
    addNewBusiness(dataJson){
      this._demoService.addingNewBusiness(dataJson).subscribe(
          data => {
              console.log("Data saved successfully!");
              this.toastr.success("successfully added","Success",{toastLife: '5000'});
              return true;
          },
          error => {
              console.error("Error saving data!");
              this.toastr.error("Failed to add", "Error",{toastLife: '5000'});
              this.registrationFailed = 'Failed to add new Business';
              return Observable.throw(error);

          }
      );
    }

    showBuList(){
      this._demoService.viewMyBusiness().subscribe(
         data => {
           console.log('showBuList::')
           console.log(data)
           this.businessList = data;
           if (this.businessList.length == 1) {
             this.viewBusinessDetails(this.businessList[0])
           } else {
             this.showbusinessList = true;
           }
         },
         error => {
           this.toastr.error("", "ERROR!!",{toastLife: '3000'});
         }
      );
    }
    viewBusinessDetails(data){
      this.model=data
      this.formSubmitName = 'Submit';
      this.formTitle = data.companyName;
      this.showbusinessList = false;
    }

    editBusiness(dataJson){
      this._demoService.editBusinessService(dataJson).subscribe(
          data => {
              console.log("Data saved successfully!");
              this.toastr.success("successfully added","Success",{toastLife: '5000'});
              return true;
          },
          error => {
              console.error("Error saving data!");
              this.toastr.error("Error saving data!", "ERROR!!",{toastLife: '5000'});
              this.registrationFailed = 'Failed to edit Data';
              return Observable.throw(error);
          }
      );
    }

    addressDetails(data) {
        let JsonData = {details: data};
        this._demoService.getLocationDetails(JsonData).subscribe(
            data => {
                console.log(data)
                this.locDeatils(data);
                return true;
            },
            error => {
                console.error("Error fetching data!");
                this.toastr.error("Error while fetching data!", "ERROR!!",{toastLife: '5000'});
                return Observable.throw(error);
            }
        );
    }

    sendOtp(mobileNum){
        console.log('send otp comp.ts'+ mobileNum)
          this.router.navigate(['/', 'otpVerification']);
          this._demoService.sendOtp(mobileNum).subscribe(
             data => {
               this._demoService.changeMessage(data+'Regi')
             },
             error => {
             }
          );
    }

    doesUserExist(mobileNum){
      console.log("mobile:"+mobileNum)
      this._demoService.doesUserExist({'mobile':mobileNum}).subscribe(
         data => {
           console.log("hehehe")
           if (data) {
             console.log("data:"+data)
             this.model.mobile = null;
             this.mobilecheck = true;
           }
         },
         error => {

         }
      );
    }

    getLocation() {
      console.log("lat n long");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}

showPosition(position) {
  alert("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
}

}
