'use client'
import { APIProvider, Map } from "@vis.gl/react-google-maps"

export default function MapsContainer() {

    const googleMapsAPIKey= process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (googleMapsAPIKey === undefined) {
        return
    }

  
    return (
        <APIProvider apiKey={googleMapsAPIKey}>
            
            <Map
                className="w-[50vw] h-[82vh]"
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling={'greedy'}
            >
            
            </Map>
           
        </APIProvider>
    )
}