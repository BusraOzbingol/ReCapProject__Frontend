import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Register } from 'src/app/models/register';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRouted: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  userUpdateForm: FormGroup;
  currentUser:Register;
  userId:number;

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if(params["userId"])
      {
        this.getUserById(params["userId"])
        this.createUserUpdateForm();
      }
    })
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password:["", Validators.required],
    });
  }

  getUserById(userId: number) {
    this.userService.getById(userId).subscribe((response) => {
      if (response.success) {   
        this.currentUser = response.data;
        this.userUpdateForm.get('firstName')?.setValue(this.currentUser.firstName); 
        this.userUpdateForm.get('lastName')?.setValue(this.currentUser.lastName);
        this.userUpdateForm.get('email')?.setValue(this.currentUser.email);
      }
    });
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      this.userService.update(userModel,this.currentUser.id).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/araclar']);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}