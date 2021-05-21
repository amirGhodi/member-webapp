import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

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
