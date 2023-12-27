import { ReportService } from '../report.service';
import { Observable, of } from 'rxjs';
import { Report } from '../report';

import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { LocationsService } from '../locations.service';
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{
  private map: any 
  reports$: Observable<Report[]>

  constructor(private rs: ReportService, private ls: LocationsService) { 
    this.reports$ = of([])
  };

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([49.2, -123], 11) 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map)
    this.ls.get().subscribe(
      (reports) => {
        reports.forEach((r) => {
          const popupContent = '<b>' + r.placeName + '</b><br><b>' + r.caseNumber + ' nuisance reports</b>';
          L.marker(r.coordinates).addTo(this.map).bindPopup(popupContent).openPopup();
        })
      }
    ) 
  }
}
