import { CarImage } from "./carImage";

export interface Car{
    id:number;
    brandId:number;
    colorId:number;
    modelYear:number;
    dailyPrice:number;
    description:string;
    status: boolean;
    carImages: CarImage[];
    imagePath: string;
}