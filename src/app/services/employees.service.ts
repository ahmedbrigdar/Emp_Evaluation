import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: Http) { }
}
