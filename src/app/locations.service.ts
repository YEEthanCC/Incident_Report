import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { LatLngExpression } from "leaflet";
import { Location } from './locations';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locations: Location[] 

  constructor(private http: HttpClient) { 
    this.locations = [] 
  }

  get(): Observable<Location[]> {
    return this.http.get<{ key: string, data: Location[] }>('https://272.selfip.net/apps/06DbTWpWIT/collections/data1/documents/locations/')
    .pipe(
      map(res => {
        this.locations = res.data 
        return res.data 
      })
    )
  }
  
  getLocation(placeName: string) {
    for(let i = 0; i < this.locations.length; i++) {
      if(this.locations[i].placeName == placeName) {
        return this.locations[i]  
      }
    }
    return null 
  }

  add(placeName: string, coordinates: LatLngExpression) {
    let inArray: boolean = false 
    for(let i = 0; i < this.locations.length; i++) {
      if(this.locations[i].placeName == placeName) {
        this.locations[i].caseNumber++ 
        inArray = true  
      }
    }
    if(!inArray) {
      this.locations.push(new Location(placeName, coordinates)) 
    }
    const updateData = {key: 'locations', "data": this.locations}
    this.http.put('https://272.selfip.net/apps/06DbTWpWIT/collections/data1/documents/locations/', updateData).subscribe(response=>{console.log(response)})
  }

  delete(placeName: string) {
    let inArray: boolean = false 
    for(let i = 0; i < this.locations.length; i++) {
      if(this.locations[i].placeName == placeName) {
        if(this.locations[i].caseNumber <= 1) {
          this.locations = this.locations.filter((p) => p.placeName != placeName)
        } else {
          this.locations[i].caseNumber-- 
        }
      }
    }
    const updateData = {key: 'locations', "data": this.locations}
    this.http.put('https://272.selfip.net/apps/06DbTWpWIT/collections/data1/documents/locations/', updateData).subscribe(response=>{console.log(response)})
  }
}
