import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import * as data from '../data/data.json';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userEmail : any;
  public userPassword : any;
  public userData : any;
  public defaultJson = data['default'];
  constructor(
    public _AuthService : AuthService,
    public _toastr: ToastrService,
    public _Router : Router
  ) { }

  ngOnInit(): void {
  }

  submit(form) {

    if (!form.valid) {
      this.setFocusToInvalidElement(form);
    } else {
      let body = {};
      body['email'] = this.userEmail;
      body['password'] = this.userPassword;
      if (this.userEmail != this.defaultJson.email) {
        this._toastr.error("invalid user");
        this._AuthService.loginApiCall(false);
        this._Router.navigate(['/member'])
      } else if (this.userPassword != this.defaultJson.password) {
        this._toastr.error("invalid password");
        this._AuthService.loginApiCall(false);
        this._Router.navigate(['/member'])
      } else {
        this._toastr.success("login successful");
        this._AuthService.loginApiCall(true);
        sessionStorage.setItem("username", this.defaultJson.username);
        this._Router.navigate(['/member'])
      }
    }
  }

  setFocusToInvalidElement(form) {
    if (!form.valid) {
      let target;
      target = document.getElementsByClassName('ng-invalid')[1];
      if (target) {
        target.focus();
      }
    }
  }
}
