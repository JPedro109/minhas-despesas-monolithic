-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
