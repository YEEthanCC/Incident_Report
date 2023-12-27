import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { DataTableComponent } from './data-table/data-table.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddLocationComponent } from './add-location/add-location.component';
import { EditReportComponent } from './edit-report/edit-report.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    AddReportComponent,
    DataTableComponent,
    HomeComponent,
    MapComponent,
    AddLocationComponent,
    EditReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule, 
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
