import { Component } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
//import {  User } from '../api-service.service';
//import { Table } from 'primeng/table';
//import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { User } from 'src/models/user';
 

@Component({
  selector: 'app-api-calling',
  templateUrl: './api-calling.component.html',
  styleUrls: ['./api-calling.component.css']
})
export class ApiCallingComponent {
  userForm: any;
  massage: any;
  userData: any;
  res: any;
  resstatus: any;
  isValidUser: boolean = false;



  constructor(private formbulider: FormBuilder, private userService: ApiService) { }

  ngOnInit(): void {
    this.userForm = this.formbulider.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
  }

  PostData(user: User) {
    
    const user_Master = this.userForm.value;
    this.userData = JSON.stringify(user_Master);
    this.userService.postData(user_Master).subscribe
      ((response: any) => {
        const token = (<any>response).token
        localStorage.setItem("jwt", token);
        this.massage = 'You are now authorize';
        this.isValidUser = true;
         
      }
    );
  }

  GetWeatherData() {
    
    const product_Master = this.userForm.value;

    this.userService.getWeatherData().subscribe(
      (response: any) => {
        this.res = (<any>response)
         console.log(this.res);
         this.resstatus = "OK";
         this.isValidUser = true;
         
      }, (error) => {
        this.resstatus = error.status;
        if(this.resstatus == 401)
        {
          this.massage = "You are not authorize to view the data. Please login and try again.";
          this.isValidUser = false;
        }
        this.res = "";
    }
      
    );
  }
}
