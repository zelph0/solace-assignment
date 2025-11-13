'use client';

import { useState } from 'react';
import { useAdvocates } from '@/hooks/useAdvocates';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { AdvocateCard } from './AdvocateCard';
import { Pagination } from './Pagination';
import { LoadingSkeleton } from './LoadingSkeleton';

export function AdvocateTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, error } = useAdvocates({
    page,
    pageSize: 20,
    search: debouncedSearch,
    specialty: selectedSpecialty,
    sortBy: 'newest',
    sortOrder: 'desc',
  });

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedSpecialty('');
    setPage(1);
  };

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-red-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-medium text-red-900 mb-2">
          Error Loading Advocates
        </h3>
        <p className="text-sm text-red-700">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search advocates by name, specialty, or location..."
          />
        </div>
        <div className="lg:col-span-1">
          <FilterPanel
            selectedSpecialty={selectedSpecialty}
            onSpecialtyChange={handleSpecialtyChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>

      {data && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {data.pagination.totalCount.toLocaleString()} Advocates Found
          </h2>
          {(debouncedSearch || selectedSpecialty) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedSpecialty('');
                setPage(1);
              }}
              className="text-sm font-medium transition-colors"
              style={{ color: '#265b4e' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1a3f36'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#265b4e'}
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {isLoading && <LoadingSkeleton count={5} />}

      {!isLoading && data && (
        <>
          {data.data.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No advocates found
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedSpecialty('');
                  setPage(1);
                }}
                className="px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                style={{ backgroundColor: '#265b4e' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3f36'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#265b4e'}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {data.data.map((advocate) => (
                <AdvocateCard key={advocate.id} advocate={advocate} />
              ))}
            </div>
          )}

          {data.data.length > 0 && (
            <Pagination
              pagination={data.pagination}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
