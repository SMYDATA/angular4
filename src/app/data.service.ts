import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const key = 'AIzaSyBFcZOIYqk_s0-qilRmve1TjMCXhYxUP3c';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    registerUser(data) {        
        console.log(data)
      
       data = JSON.stringify(data)
        var url = 'http://localhost:8585/api/saveUser'
        console.log(data)
        return this.http.post(url, data, httpOptions);
    }

    logInUser(data) {
        console.log(data)
        data = JSON.stringify(data)
        var url = 'http://localhost:8585/api/loginUser';
        return this.http.post(url, data,httpOptions);
    }

    getLocationDetails(place) {
        console.log(place)
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + place.details + '&key=' + key;
        return this.http.get(url)
    }


}
