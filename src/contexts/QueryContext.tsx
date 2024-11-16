'use client'
import React, { createContext, useState, useContext } from 'react';

export interface Filters {
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    bedCount?: number;
    bathCount?: number;
    min_price?: number;
    max_price?: number;
    homeType?: string;
}

// Define the type for the selectedLocation
export type Location = google.maps.places.PlaceResult | undefined;

export interface QueryContextProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filters: Filters;
    setFilters: (filter: Filters | ((prevFilters: Filters) => Filters)) => void;
    refresh: boolean;
    setRefresh: (refresh: boolean) => void;
    selectedLocation: Location;  // Use the SelectedLocation type
    setSelectedLocation: (selectedLocation: Location) => void;
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
    const [refresh, setRefresh] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<Location>(undefined); // Properly typed

    const value: QueryContextProps = {
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
        filters: filters,
        setFilters: setFilters,
        refresh: refresh,
        setRefresh: setRefresh,
        selectedLocation: selectedLocation,
        setSelectedLocation: setSelectedLocation,
    };

    return (
        <QueryContext.Provider value={value}>
            {children}
        </QueryContext.Provider>
    );
}
