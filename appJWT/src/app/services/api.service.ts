import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:61187/api/';
  auth_token : any
  response: any
  constructor(private http: HttpClient) { }

  postData(userData:User) {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    this.response = this.http.post<String>(this.url + 'WeatherForecast/jwtauth', userData, httpHeaders);
    return this.response;
     
  }

  getWeatherData() {
    this.auth_token = localStorage.getItem("jwt");
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'Bearer ' + this.auth_token
    }
    const httpHeaders = { headers:new HttpHeaders(headerDict)};
    return this.http.get(this.url + 'WeatherForecast',  httpHeaders);
  }
}
