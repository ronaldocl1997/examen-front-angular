import { CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimeNGConfig} from 'primeng/api';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit{

  constructor(private primengConfig: PrimeNGConfig){

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
