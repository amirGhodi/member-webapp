import { Component, OnInit } from '@angular/core';
import * as data from '../data/data.json';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  public memberData = data['default']['data'];
  public showList = true;
  public update = false;
  public joinDate : any;
  public memberID : any;
  public id : any;
  public fname : any;
  public statusCheck = false;
  public first = false;
  public second = false;
  public third = false;
  public fourth = false;
  public lastId : any;
  public username : any;
  public dataExist : any;
  public current = new Date();
  constructor(
    public _AuthService : AuthService,
    public _Router : Router,
    public _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
    if(this.memberData.length == 0) {
      this.dataExist = false;
    } else {
      this.dataExist = true;
      this.lastId = this.memberData[this.memberData.length - 1]['_id'];
    }
  }

  edit(data) {
    this.showList = false;
    this.update = true;
    this.fname = data.Name;
    this.statusCheck = data.Status;
    this.memberID = data.ID;
    this.id = data._id;
    this.joinDate = new Date (data.Join_Date);
    this.first = data.section.first;
    this.second = data.section.second;
    this.third = data.section.third;
    this.fourth = data.section.fourth;

  }

  logout() {
    this._AuthService.loginApiCall(false);
    sessionStorage.clear();
    this._toastr.success("Logout successfully");
    this._Router.navigate(['/login'])
  }

  delete(data) {
    const index = this.memberData.map(function(item) { return item._id; }).indexOf(data._id);
    if (index !== -1) {
      const removedData = this.memberData.splice(index, 1)
      this._toastr.success("Data deleted successfully");
      if(this.memberData.length == 0) {
        this.dataExist = false
      }
    }
    
  }

  addMember() {
    this.showList = false;
    this.update = false;
    this.fname = '';
    this.statusCheck = false;
    this.memberID = '';
    this.joinDate = '';
    this.first = false;
    this.second = false;
    this.third = false;
    this.fourth = false;
  }

  submit(form) {

    if (!form.valid) {
      this.setFocusToInvalidElement(form);
    } else {
      if(this.update) {
        this.memberData.forEach(element => {
          if (element._id == this.id) {
            element.Name = this.fname;
            element.Join_Date = this.joinDate;
            element.Status = this.statusCheck;
            element.ID = this.memberID;
            element.section.first = this.first ;
            element.section.second = this.second;
            element.section.third = this.third;
            element.section.fourth = this.fourth;
          }
        });
        this._toastr.success("Data updated successfully");
      } else {
        const body = {};
        const section = {}
        body['Name'] = this.fname;
        body['Join_Date'] = this.joinDate;
        body['Status'] = this.statusCheck;
        body['ID'] = this.memberID;
        section['first'] = this.first ;
        section['second'] = this.second;
        section['third']= this.third;
        section['fourth'] = this.fourth;
        body['section'] = section
        this.lastId = this.lastId + 1
        body['_id'] = this.lastId;
        this.memberData.push(body);
        this.dataExist = true;
        this._toastr.success("Data added successfully");
      }
      this.showList = true;
      this.update = false;
      form.reset();
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

  cancel(form) {
    this.showList = true;
    this.update = false;
    form.reset();
  }
}
