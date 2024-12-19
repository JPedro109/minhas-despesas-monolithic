import { PlanEntity, PlanNameEnum } from "@/layers/domain";
import { IPlanRepository } from "@/layers/application";
import { DatabaseSQLHelper, PrismaClientType, PrismaMapperHelper } from "@/layers/external";

export class PrismaPlanRepositoryAdapter implements IPlanRepository {

    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async getPlans(): Promise<PlanEntity[]> {
        const plans = await this.context.prismaPlan.findMany({
            include: {
                actions: true
            }
        });
        return plans.map(plan => PrismaMapperHelper.toPlanEntity(plan, plan.actions));
    }

    async getPlanByName(planName: PlanNameEnum): Promise<PlanEntity | null> {
        const plan = await this.context.prismaPlan.findFirst({
            where: { name: planName },
            include: {
                actions: true
            }
        });

        if(!plan) return null;

        return PrismaMapperHelper.toPlanEntity(plan, plan.actions);
    }

    async getPlanById(planId: string): Promise<PlanEntity | null> {
        const plan = await this.context.prismaPlan.findUnique({
            where: { id: planId },
            include: {
                actions: true
            }
        });

        if(!plan) return null;

        return PrismaMapperHelper.toPlanEntity(plan, plan.actions);
    }
}