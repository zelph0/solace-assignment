'use client';

import { useFilterValues } from '@/hooks/useAdvocates';

interface FilterPanelProps {
  selectedSpecialty: string;
  onSpecialtyChange: (specialty: string) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  selectedSpecialty,
  onSpecialtyChange,
  onClearFilters,
}: FilterPanelProps) {
  const { data: specialties, isLoading: specialtiesLoading } =
    useFilterValues('specialties');

  const hasActiveFilters = selectedSpecialty !== '';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium transition-colors"
            style={{ color: '#265b4e' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1a3f36'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#265b4e'}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="specialty-filter"
          className="block text-sm font-medium text-gray-700"
        >
          Health Specialty
        </label>
        <select
          id="specialty-filter"
          value={selectedSpecialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
          style={{
            focusRing: '2px solid #265b4e',
            borderColor: selectedSpecialty ? '#265b4e' : undefined,
          }}
          disabled={specialtiesLoading}
        >
          <option value="">All Specialties</option>
          {specialties?.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSpecialty && (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: 'rgba(38, 91, 78, 0.1)', color: '#265b4e' }}
              >
                {selectedSpecialty}
                <button
                  type="button"
                  onClick={() => onSpecialtyChange('')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full focus:outline-none"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(38, 91, 78, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  aria-label="Remove filter"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
