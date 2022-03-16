import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicRoutingModule } from './public-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './_pages/home/home.component';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { LoginComponent } from './_pages/login/login.component';

@NgModule({
  declarations: [
    PublicComponent,
    // Pages
    HomeComponent,
    // Components
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    PublicRoutingModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    // Form
    ReactiveFormsModule,
    FormsModule,
    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class PublicModule { }
