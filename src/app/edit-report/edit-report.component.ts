import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png'; 
const iconUrl = 'assets/marker-icon.png'; 
const shadowUrl = 'assets/marker-shadow.png'; 
const iconDefault = icon({ 
  iconRetinaUrl, 
  iconUrl,
  shadowUrl, 
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  tooltipAnchor: [16, -28], 
  shadowSize: [41, 41] 
});
Marker.prototype.options.icon = iconDefault;

import { FormControl, FormGroup } from '@angular/forms'
import { ReportService } from '../report.service';
import { Report } from '../report';

import { Router, ActivatedRoute } from '@angular/router';
import { LocationsService } from '../locations.service';
import { Observable, of } from 'rxjs';
import { Location } from '../locations';


@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrl: './edit-report.component.css'
})
export class EditReportComponent {
  bname: string = this.ActivatedRoute.snapshot.params['name'] 
  report!: Report   
  form: FormGroup 
  locations$: Observable<Location[]> = of([]) 
  selectedLocation: string = ''

  constructor(private ActivatedRoute: ActivatedRoute, private ls: LocationsService, private rs: ReportService, private router: Router) {
    this.locations$ = this.ls.get() 
    this.report = this.rs.getReport(this.bname) 
    let formControls = {
      name: new FormControl(this.report?.name || "") ,
      witness: new FormControl(this.report?.witness || "") ,
      contact: new FormControl(this.report?.contact || "") ,
      info: new FormControl(this.report?.info || "") ,
      imageUrl: new FormControl(this.report?.imageUrl || ""), 

    }
    this.form = new FormGroup(formControls)
    this.selectedLocation = this.report.placeName 
  }

  ngOnInit(): void {
    this.locations$ = this.ls.get() 
    this.report = this.rs.getReport(this.bname) 
  }

  onSubmit(newReport: any) {
    const selectedLocationData = this.ls.getLocation(this.selectedLocation);

    if (selectedLocationData) {
      this.rs.add(new Report(
        newReport.name,
        this.selectedLocation,
        newReport.witness,
        newReport.contact,
        newReport.info,
        newReport.imageUrl,
        selectedLocationData.coordinates
      ));
  
      console.log(this.rs.get());
      this.router.navigate(["home"]);
    } else {
      // Handle the case where the selected location data is null
      console.error('Selected location data is null');
    }
  }

  onLocationChange(e: any) {
    if(e.target.value === 'Add new location') {
      this.router.navigate(['add-location'])
    }
  }
}
