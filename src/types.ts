
export interface Feature {
    bed_count?: number;
    bath_count?: number;
    room_type?: string;
    roommate_gender?: string;
    max_radius?: number;
    is_pets?: boolean;
}
  
  
export interface Listing {
    price: number;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    uid: string;
    latitude: number;
    longitude: number;
    feature?: Feature;
}

export interface Filters {
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    bed_count?: number;
    bath_count?: number;
    min_price?: number;
    max_price?: number;
    homeType?: string;
    room_type?: string;
    roommate_gender?: string;
    pets?: boolean;
    max_radius?: number;
}

export type LocationLatLng = { lat: number, lng: number };

export type Location = google.maps.places.PlaceResult | undefined;

