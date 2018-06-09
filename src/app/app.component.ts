import { Component,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmyData';
  view = 'homePage';
  showProfile =false;
  allCookies;
  constructor(public toastr: ToastsManager, private router: Router, private cookieService: CookieService, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
       }
       ngOnInit(): void {
         this.allCookies = this.cookieService.getAll();
         console.log(this.allCookies);
         if(this.allCookies && this.allCookies.mobile){
           this.showProfile = true;
         };
    };

    signInCall(){
      this.view='';
      this.router.navigate(['/', 'signIn']);
    }

    logOut(){
      this.view = 'homePage';
       this.showProfile = false;
    }

}
