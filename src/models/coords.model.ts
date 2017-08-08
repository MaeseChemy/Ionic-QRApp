export class Coords {
    lat: number;
    lng: number;

    constructor(lat: number, lng: number){
        this.lat = lat;
        this.lng = lng;
    }

    toString(): string {
        return "Coords: Lat["+this.lat+"] - Lng["+this.lng+"]";
    }
}