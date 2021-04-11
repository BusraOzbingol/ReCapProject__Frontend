import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl =  'https://localhost:44321/api/'


  constructor(
    private httpClient: HttpClient, private localeStorageService:LocaleStorageService
  ) { }
  
  getClaims(user:User):Observable<ListResponseModel<User>>{
    let path = this.apiUrl + 'getclaims'
    return this.httpClient.post<ListResponseModel<User>>(path, user);
  }

  getByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + 'getbymail?email='+email;
    return this.httpClient.post<SingleResponseModel<User>>(newPath, email);
  }

  update(user:Register,userId:number):Observable<ResponseModel>{
    let path = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(path, user);
  }
  profileUpdate(user:User):Observable<ResponseModel>{
    console.log(user)
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'users/updateprofile', {
      user:{
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'status':user.status
      },
      password:user.password
    });
  }
  getById(userId:number):Observable<SingleResponseModel<Register>>{
    return this.httpClient.get<SingleResponseModel<Register>>(this.apiUrl+"getbyid?userId="+userId);
  }

}
