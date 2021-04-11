import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car;
  images: CarImage[];
  imageUrl = 'https://localhost:44321/'
  rentalControl = false;
  rentalMessage="";
  constructor(
    private authService:AuthService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private carService: CarService,
    private rentalService: RentalService,
    
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImagesByCarId(params['carId']);
        this.getRentalControl(params["carId"])
      }
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetail(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
    });
  }

  getBack() {
    this.carService.getCars();
  }

  getSliderClassName(index: number) {
    if (index == 0) {
      return 'carouse1-item active';
    } else {
      return 'carouse1-item';
    }
  }
  isAuthenticated(){
    return this.authService.isAuthenticated()
  }
  getRentalControl(carId:number) {
    this.rentalService.getRentalControl(carId).subscribe((response) => { 
      this.rentalControl=response.success;
      this.rentalMessage=response.message; 
    });
  }
}