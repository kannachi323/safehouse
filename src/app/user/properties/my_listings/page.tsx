'use client'
import ViewMyListingsContainer from "@/containers/user-page/ViewMyListingsContainer";
import { LoadScript } from "@react-google-maps/api";

export default function Page() {
    const googleMapsAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (googleMapsAPIKey === undefined) {
        return
    }
    
    return (
        <LoadScript googleMapsApiKey={googleMapsAPIKey} libraries={['places']}>
            <ViewMyListingsContainer />

        </LoadScript>
            
    )
}