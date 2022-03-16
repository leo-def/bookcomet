import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './_components/header/header.component';
import { FooterComponent } from './_components/footer/footer.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { SidenavComponent } from './_components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AdminComponent,
    // Pages
    DashboardComponent,
    // Components
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ],
  imports: [
    AdminRoutingModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class AdminModule { }
