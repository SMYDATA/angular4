import { Injectable, EventEmitter } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const key = 'AIzaSyBFcZOIYqk_s0-qilRmve1TjMCXhYxUP3c';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    private messageSource = new BehaviorSubject<number>(12345);
    cast = this.messageSource.asObservable();

     changeMessage(message: any) {
       console.log('message:servuce:'+message);
       this.messageSource.next(message);
     }

    registerUser(data) {
        let body = JSON.stringify(data);
        console.log(data)
        var url = 'http://localhost:8585/api/saveUser';
        console.log(url)
        return this.http.post(url, body, httpOptions);
    }

    logInUser(data) {
        console.log(data)
        var url = 'http://localhost:8585/api/loginUser';
        return this.http.post(url, data)
    }

    getLocationDetails(place) {
        console.log(place)
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + place.details + '&key=' + key;
        return this.http.get(url)
    }

    sendOtp(number){
    console.log('In service sendOtp:: '+number)
      var url = 'http://localhost:8585/api/sendOtp/'+number;
      return this.http.get(url)
    }

    resetpassword(pwd){
      var url = 'http://localhost:8585/api/resetPwd/'+pwd;
      return this.http.get(url, pwd)
    }
}
