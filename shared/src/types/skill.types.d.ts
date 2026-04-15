export type SkillCategory = 'languages' | 'frameworks' | 'databases' | 'devops' | 'tools' | 'other';
export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    iconUrl: string | null;
    proficiencyLevel: number;
    sortOrder: number;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=skill.types.d.ts.map