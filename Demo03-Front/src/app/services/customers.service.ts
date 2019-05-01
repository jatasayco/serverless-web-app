import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  public url: string;
  constructor(private _http: Http ) { 
    this.url = environment.api.url_customers;
  }
  getCustomers() {
    console.log("iniciando getCustomers");
    console.log("API");
    console.log(this.url);
    return this._http.get(this.url);
  }
}
