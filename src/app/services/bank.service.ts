import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  apiUrl = 'https://localhost:44321/api/';
  constructor(private httpClient: HttpClient) {}

  payment(): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/getall';
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
