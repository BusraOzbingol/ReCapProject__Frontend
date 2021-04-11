import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from './components/login/login.component';
import { NaviComponent } from './components/navi/navi.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { AuthInterceptor } from './interceptors/auth.interceptor';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {ToastrModule} from "ngx-toastr";
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { InformationComponent } from './components/information/information.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CarComponent,
    CarAddComponent,
    CartSummaryComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    LoginComponent,
    NaviComponent,
    FilterPipePipe,
    VatAddedPipe,
    FilterBrandPipe,
    FilterColorPipe,
    InformationComponent,
    CarDetailComponent,
    BrandAddComponent,
    ColorAddComponent,
    ProfileComponent
  ],
  imports: [ BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
