import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car;
  images: CarImage[];
  imageUrl = 'https://localhost:44321/'
  constructor(
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImagesByCarId(params['carId']);
        //this.getCarImagesByCarId();
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
}