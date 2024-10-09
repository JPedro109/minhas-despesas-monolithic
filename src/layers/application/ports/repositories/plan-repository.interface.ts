import { PlanEntity, PlanNameEnum } from "@/layers/domain";

export interface IPlanRepository {
    setContext(context: unknown): void;    
    getPlanByName(planName: PlanNameEnum): Promise<PlanEntity>;
    getPlanById(planId: string): Promise<PlanEntity>;
}