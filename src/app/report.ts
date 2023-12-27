import { LatLngExpression } from "leaflet";

export class Report {
    name: string;
    placeName: string;
    witness: string;
    contact: string;
    time: number;
    status: string;
    info: string;
    imageUrl: string;
    coordinates: LatLngExpression;

    constructor(name: string, placeName: string, witness: string, contact: string, info: string, imageUrl: string, coordinates: LatLngExpression) {
        this.name = name;
        this.placeName = placeName;
        this.witness = witness;
        this.contact = contact;
        this.time = new Date().getTime();
        this.status = "OPEN";
        this.info = info;
        this.imageUrl = imageUrl;
        this.coordinates = coordinates;
    }
}