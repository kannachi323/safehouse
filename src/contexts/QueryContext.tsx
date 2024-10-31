'use client'
import React, { createContext, useState, useContext } from 'react';

export interface Filter {
    bedCount?: number;
    bathCount?: number;
    homeType?: string;
}

export interface QueryContextProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filters: Filter;
    setFilters: (filter: Filter) => void;
}

export const QueryContext = createContext<QueryContextProps | undefined>(undefined);

export function useQuery() {
    const queryContext = useContext(QueryContext);

    if (!queryContext) {
        throw new Error('FiltersContainer must be used within a QueryProvider');
    }

    return queryContext;
}

export function QueryProvider({ children } : { children : React.ReactNode}) {
    const [filters, setFilters] = useState<Filter>({

    })
    const [searchQuery, setSearchQuery] = useState('')

    const value : QueryContextProps = {
        searchQuery : searchQuery,
        setSearchQuery : setSearchQuery,
        filters : filters,
        setFilters : setFilters
    }

    return (
        <QueryContext.Provider value={value}>
            {children}
        </QueryContext.Provider>
    )
}