import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocaleStorageServiceService } from './locale-storage-service.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44321/api/auth/';
  

  constructor(private httpClient: HttpClient,private localeStorageService:LocaleStorageServiceService,private userService:UserService) { }

  login(loginModel:LoginModel) {
    this.setCurrentUser(loginModel.email)
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel);
  }
isAuthenticated(){
  if(localStorage.getItem("token")){
    return true;
  }else{
    return false;
  }
}
register(registerModel:Register):Observable<SingleResponseModel<TokenModel>>{
  return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
}
logout(){
  this.localeStorageService.remove("token")
  this.localeStorageService.remove("user")
}


private setCurrentUser(email:string){
  this.userService.getByEmail(email).subscribe(response => {
    let user = response.data
    this.localeStorageService.set("user", user)
  })
}


}

