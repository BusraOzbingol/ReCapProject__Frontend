import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocaleStorageServiceService } from 'src/app/services/locale-storage-service.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  currentUser:User

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private localStorageService:LocaleStorageServiceService,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
  
    this.getCurrentUser;
  }

 
  

  isAuthenticated(){
    return this.authService.isAuthenticated()
  }

  getCurrentUser(){
    return this.localStorageService.get('user')
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}