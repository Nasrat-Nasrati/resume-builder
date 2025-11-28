export type PlanType = 'MASTER_PLAN' | 'STRUCTURAL_PLAN' | 'DETAILED_PLAN';
export type IPlanItem = {
  id: string;
  name: string;
  description: string;
  planType: PlanType;
  attachment?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type IPlanTableFilters = {
  name: string;
  planType: PlanType | 'all';
  description: string;
};
