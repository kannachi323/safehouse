'use client'
import ViewMyListingsContainer from "@/containers/user-page/ViewMyListingsContainer";
import { QueryProvider } from "@/contexts/QueryContext";
import { useJsApiLoader } from "@react-google-maps/api";

export default function Page() {
    const googleMapsAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsAPIKey || '',
        libraries: ['places', 'marker'],
    });

    if (!isLoaded) {
        return <div className="self-center items-center">Loading...</div>;
    }
    if (loadError) {
        return <div className="self-center items-center">Sorry, experiencing some issues at the moment</div>
    }


    
    return (
        
            <QueryProvider>
                <ViewMyListingsContainer />

            </QueryProvider>
            

        
            
    )
}