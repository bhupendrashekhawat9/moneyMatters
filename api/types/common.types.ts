export interface ApiResponse<T> {
  data: T;
  status: 'SUCCESS' | 'FAILURE';
  message: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}
