export interface PaginationQuery {
    page?: number;
    limit?: number;
    tag?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
//# sourceMappingURL=pagination.dto.d.ts.map