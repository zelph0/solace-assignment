export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
  createdAt: Date;
}

export interface AdvocateFilters {
  search?: string;
  specialties?: string[];
  city?: string;
  minExperience?: number;
  maxExperience?: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdvocatesResponse {
  data: Advocate[];
  pagination: PaginationMeta;
}

export interface AdvocateSearchParams extends PaginationParams {
  search?: string;
  specialty?: string;
  city?: string;
  minExperience?: number;
  maxExperience?: number;
  sortBy?: 'name' | 'experience' | 'newest';
  sortOrder?: 'asc' | 'desc';
}
