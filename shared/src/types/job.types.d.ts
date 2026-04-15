export interface Job {
    id: string;
    company: string;
    title: string;
    description: string | null;
    highlights: string[];
    location: string | null;
    startDate: string;
    endDate: string | null;
    logoUrl: string | null;
    companyUrl: string | null;
    sortOrder: number;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=job.types.d.ts.map