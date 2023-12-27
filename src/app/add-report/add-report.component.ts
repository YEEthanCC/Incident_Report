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

import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { ReportService } from '../report.service';
import { Report } from '../report';

import { Router } from '@angular/router';
import { LocationsService } from '../locations.service';
import { Observable, of, map } from 'rxjs';
import { Location } from '../locations';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.css'
})
export class AddReportComponent implements OnInit{
  form: FormGroup 
  locations$: Observable<Location[]> = of([]) 
  selectedLocation: string = ''
  invalidNames: String[] = []  

  constructor(private ls: LocationsService, private rs: ReportService, private router: Router) {


    let formControls = {
      name: new FormControl('', [
        Validators.required, 
        // this.invalidNameValidator as ValidatorFn 
      ]),
      witness: new FormControl('', [
        Validators.required, 
      ]),
      contact: new FormControl('', [
        Validators.required, 
      ]),
      info: new FormControl('', [
        Validators.required, 
      ]),
      imageUrl: new FormControl('', [
        Validators.required, 
      ]), 
    }
    this.form = new FormGroup(formControls) 
  }

  invalidNameValidator = (control: FormControl) => {
    console.log(this.invalidNames);
    if (this.invalidNames.includes(control.value.trim())) {
      return { name_error: "The name already exists" };
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.rs.get().subscribe(
      (res) => { 
        this.invalidNames = res.map(r => r.name) 
        console.log(this.invalidNames) 
        let formControls = {
          name: new FormControl('', [
            Validators.required, 
            this.invalidNameValidator as ValidatorFn 
          ]),
          witness: new FormControl('', [
            Validators.required, 
          ]),
          contact: new FormControl('', [
            Validators.required, 
          ]),
          info: new FormControl('', [
            Validators.required, 
          ]),
          imageUrl: new FormControl('', [
            Validators.required, 
          ]), 
        } 
        this.form = new FormGroup(formControls) 
      }
    )
    this.locations$ = this.ls.get() 
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
      this.ls.add(this.selectedLocation, selectedLocationData.coordinates) 
      // console.log(this.rs.get());
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
