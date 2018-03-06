import { Component } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
//import {WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public model: any = {mobile:'',password:''};
    submitted = false;
    rememberMe = false;
    loginFail = false;
    public data:any=[];
    storage: any=[];

    constructor(private _demoService: DataService, private router: Router) { }

    onSubmit() {
      this.logInUser(this.model)
     }
     logInUser(data) {
    	 console.log("inside login::")
        // let JsonData = {details: data}
    	 console.log(data);
         this._demoService.logInUser(data).subscribe(
            data => {
              console.log("success:"+data)
              console.log("valid user!");
              this.submitted = true;
              this.router.navigate(['/', 'userData']);
              return true;
            },
            error => {
              console.error("not registered!");
              this.loginFail =true;
              return Observable.throw(error);
            }
         );
       }
       
}
