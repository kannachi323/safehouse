type LocationProps = {
    setLocation: (location: GeolocationPosition) => void;
};

export function getLocation({ setLocation }: LocationProps) {
    // Success callback
    const success = (currUserLocation: GeolocationPosition) => {
        console.log("Yay, I got your location! >:)");
        return currUserLocation;
    };

    // Error callback
    const error = (err: GeolocationPositionError) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.warn("Geolocation is not available in this browser.");
    }
}
