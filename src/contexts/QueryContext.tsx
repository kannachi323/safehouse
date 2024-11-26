'use client'
import React, { createContext, useState, useContext } from 'react';
import { Filters, Listing } from "@/types";



export interface QueryContextProps {
    filters: Filters;
    setFilters: (filter: Filters | ((prevFilters: Filters) => Filters)) => void;
    listings: Listing[];
    setListings: (listings: Listing[]) => void;
    circleCenterCoordinates: google.maps.LatLng | undefined;
    setCircleCenterCoordinates: (selectedLocation: google.maps.LatLng | undefined) => void;
}

export const QueryContext = createContext<QueryContextProps | undefined>(undefined);

export function useQuery() {
    const queryContext = useContext(QueryContext);

    if (!queryContext) {
        throw new Error('FiltersContainer must be used within a QueryProvider');
    }

    return queryContext;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState<Filters>({});
    const [listings, setListings] = useState<Listing[]>([]);
    const [circleCenterCoordinates, setCircleCurrentCoordinates] = useState<google.maps.LatLng | undefined>(undefined);

    const value: QueryContextProps = {
        filters: filters,
        setFilters: setFilters,
        listings: listings,
        setListings: setListings,
        circleCenterCoordinates: circleCenterCoordinates,
        setCircleCenterCoordinates: setCircleCurrentCoordinates,
    };

    return (
        <QueryContext.Provider value={value}>
            {children}
        </QueryContext.Provider>
    );
}
