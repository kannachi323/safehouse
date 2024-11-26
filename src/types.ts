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
    max_distance?: number;
    uid?: string;
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
    members: User[];
    messages: Message[];
    type: string;
    chatId: DocumentReference;
}
  

export type LocationLatLng = { lat: number, lng: number };

export type Location = google.maps.places.PlaceResult | undefined;

