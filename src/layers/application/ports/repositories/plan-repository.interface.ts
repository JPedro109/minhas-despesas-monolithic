import { PlanEntity, PlanNameEnum } from "@/layers/domain";

export interface IPlanRepository {
    setContext(context: unknown): void;    
    getPlanByName(planName: PlanNameEnum): Promise<PlanEntity | null>;
    getPlanById(planId: string): Promise<PlanEntity | null>;
}