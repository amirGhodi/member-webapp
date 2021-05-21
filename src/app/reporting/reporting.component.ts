import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
  
  public username : any;
  constructor(
    public _AuthService : AuthService,
    public _Router : Router,
    public _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
  }

  logout() {
    this._AuthService.loginApiCall(false);
    sessionStorage.clear();
    this._toastr.success("Logout successfully");
    this._Router.navigate(['/login'])
  }
}
