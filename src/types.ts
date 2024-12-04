import { DocumentReference, Timestamp } from "firebase/firestore";

export interface User {
    uid: string;
    first_name: string;
    last_name: string;
    email: string;
    is_landlord: boolean;
}

export interface Feature {
    bed_count?: number;
    bath_count?: number;
    room_type?: string;
    roommate_gender?: string;
    description?: string;
    policies?: string;
}
  
export interface Bookmark {
    uid: string;
    listing_id: number;
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
    media?: Media[];
    listing_id?: number;
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
    room_type?: string;
    roommate_gender?: string;
    pets?: boolean;
    max_distance?: number;
    uid?: string;
}

export interface Media {
    ref: string;
    listing_id: number;
}

export interface Message {
    text: string;
    senderId: string;
    timestamp?: Timestamp;
}

export interface Chat {
    createdAt: Timestamp;
    lastMessage: string;
    lastTimestamp: Timestamp;
    title: string;
    members: string[];
    messages: Message[];
    type: string;
    chatId: DocumentReference;
}
  

export type LocationLatLng = { lat: number, lng: number };

export type Location = google.maps.places.PlaceResult | undefined;

export interface School {
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
}

