import { useQuery } from '@tanstack/react-query';
import type { AdvocatesResponse, AdvocateSearchParams } from '@/types/advocate';

async function fetchAdvocates(
  params: AdvocateSearchParams
): Promise<AdvocatesResponse> {
  const searchParams = new URLSearchParams();

  searchParams.append('page', params.page.toString());
  searchParams.append('pageSize', params.pageSize.toString());

  if (params.search) searchParams.append('search', params.search);
  if (params.specialty) searchParams.append('specialty', params.specialty);
  if (params.city) searchParams.append('city', params.city);
  if (params.minExperience !== undefined)
    searchParams.append('minExperience', params.minExperience.toString());
  if (params.maxExperience !== undefined)
    searchParams.append('maxExperience', params.maxExperience.toString());
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

  const response = await fetch(`/api/advocates?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch advocates');
  }

  return response.json();
}

export function useAdvocates(params: AdvocateSearchParams) {
  return useQuery({
    queryKey: ['advocates', params],
    queryFn: () => fetchAdvocates(params),
    placeholderData: (previousData) => previousData,
  });
}

async function fetchFilterValues(filterType: string): Promise<string[]> {
  const response = await fetch('/api/advocates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filterType }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch filter values');
  }

  const data = await response.json();
  return data.values;
}

export function useFilterValues(filterType: 'specialties' | 'cities' | 'degrees') {
  return useQuery({
    queryKey: ['filterValues', filterType],
    queryFn: () => fetchFilterValues(filterType),
    staleTime: 1000 * 60 * 10,
  });
}
