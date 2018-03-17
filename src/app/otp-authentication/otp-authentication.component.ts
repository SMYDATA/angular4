import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-otp-authentication',
  templateUrl: './otp-authentication.component.html',
  styleUrls: ['./otp-authentication.component.css']
})
export class OtpAuthenticationComponent {

  messageSource:any;
  otpValue:any;
  resetPwd:boolean;
  pwdValNew:any;
  pwdValCnf:any;
  errorDisplay:boolean;
  invalidOtp:boolean;
  errMsg:string;

    constructor(private data: DataService, private router: Router) { }
  ngOnInit() {
    this.resetPwd = false;
    this.data.cast.subscribe(messageSource => this.messageSource = messageSource)
    console.log('message::'+this.messageSource);
  }

  verifyOtp(){
  this.data.cast.subscribe(messageSource => this.messageSource = messageSource)
  console.log('verifyOtp::'+this.messageSource);
  if(this.messageSource == (this.otpValue+'Regi')){
    this.router.navigate(['/', 'userData']);
  }else if(this.messageSource == this.otpValue){
    this.resetPwd = true;
  }else{
    this.invalidOtp = true;
  }
}
  resetPswd(){
    if (this.pwdValNew == this.pwdValCnf) {
      this.data.resetpassword(this.pwdValNew).subscribe(
         data => {
           this.router.navigate(['/', 'userData']);
           return true;
         },
         error => {
           this.errorDisplay = true;
           this.errMsg = 'Could not Reset the password. Try Again';
         }
      );
    }else{
      this.errorDisplay = true;
      this.errMsg = 'Password Match error';
    }
  }

}
