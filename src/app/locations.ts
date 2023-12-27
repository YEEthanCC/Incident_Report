import { ComponentFixture } from '@angular/core/testing';
import { LatLngExpression } from "leaflet";

export class Location {
    placeName: string 
    coordinates: LatLngExpression 
    caseNumber: number
    
    constructor(placeName: string, coordinates: LatLngExpression) {
        this.placeName = placeName 
        this.coordinates = coordinates 
        this.caseNumber = 0 
    }
}