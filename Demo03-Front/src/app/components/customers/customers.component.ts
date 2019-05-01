import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.styl']
})
export class CustomersComponent implements OnInit  {

  displayedColumns: string[] = ['customer_id', 'name', 'surname', 'age', 'address', 'phone'];
  //dataSource = ELEMENT_DATA;

  ar_customers:Array<any>

  constructor(protected serv:CustomersService) { }

  ngOnInit() {
    console.log("iniciando api");
    //console.log(this.dataSource);
    //this.serv.getCustomers().subscribe(result => console.log(result.json().data));
    this.serv.getCustomers().subscribe(result => this.ar_customers=result.json().data)
    console.log(this.ar_customers);

  }

}
