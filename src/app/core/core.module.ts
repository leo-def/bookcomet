import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './_services/auth.service';
import { LoadingService } from './_services/loading.service';
import { SidenavService } from './_services/sidenav.service';



@NgModule({
  declarations: [],
  providers: [
    AuthService,
    LoadingService,
    SidenavService
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ]
})
export class CoreModule { }
