'use client'
import { useQuery } from '@/contexts/QueryContext';
import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

interface Listing {
  lat: number;
  lng: number;
  title: string;
}
export default function MapsContainer() {
  const { selectedLocation } = useQuery();
  const [listings, setListings] = useState<Listing[]>([]);


  // if no location provided
  const defaultCoordinates = { lat: 36.9741, lng: -122.0308 };
  const coordinates = selectedLocation?.geometry?.location
    ? { lat: selectedLocation.geometry.location.lat(), lng: selectedLocation.geometry.location.lng() }
    : defaultCoordinates;

  // Set the map center to the coordinates (use the selected location if available)
  const mapCenter = coordinates;

  useEffect(() => {
    async function fetchListings() {
      try {
        const params = new URLSearchParams();
        params.append('latitude', coordinates.lat.toString());
        params.append('longitude', coordinates.lng.toString());
        // implement filters using params.append();

        const response = await fetch(`/api/listings?${params.toString()}`);
        const data = await response.json();

        setListings(
          data.map((listing: any) => ({
            lat: listing.latitude,
            lng: listing.longitude,
            title: listing.address || 'Listing',
          }))
        );
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    }
    fetchListings();
  }, [coordinates]);

  const isWithinRadius = (listing: Listing, center: google.maps.LatLngLiteral) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 3958.8; // radius of Earth (miles)
    const lat1 = center.lat;
    const lon1 = center.lng;
    const lat2 = listing.lat;
    const lon2 = listing.lng;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =  //square of half the chord length between the two points
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));  // c = angular distance between two points (radians)
      const distance = R * c;
      return distance <= 5;
  };
  return (
    <GoogleMap
      mapContainerStyle={{ width: '50vw', height: '82vh' }}
      center={mapCenter}  // Set map center to coordinates
      zoom={14}
    >
      <Marker position={coordinates} /> {/* Marker for search center*/}

      {/* Markers for listings within 5 miles*/}
      {listings
        .filter((listing) => isWithinRadius(listing, coordinates))
        .map((listing, index) => (
          <Marker
            key={index}
            position={{ lat: listing.lat, lng: listing.lng }}
            title={listing.title}
          />
        ))}
    </GoogleMap>
  );
}
