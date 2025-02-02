import { PlanEntity } from "@/layers/domain";

export interface IPlanRepository {
    setContext(context: unknown): void;
    getPlans(): Promise<PlanEntity[]>;
    getPlanById(planId: string): Promise<PlanEntity | null>;
}
