import { Injectable } from '@angular/core';
import * as data from '../app/data/data.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorization = false;
  constructor() { }

  loginApiCall(data) {
    this.authorization = data;
  }
}
