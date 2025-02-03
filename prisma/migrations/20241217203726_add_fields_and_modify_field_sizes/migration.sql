/*
  Warnings:

  - You are about to alter the column `verification_code` on the `user_verification_codes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `VarChar(6)`.
  - Added the required column `url_expiry_date` to the `extracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "expense_name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "extracts" ADD COLUMN     "url_expiry_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "payment_histories" ALTER COLUMN "expense_name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user_verification_codes" ALTER COLUMN "verification_code" SET DATA TYPE VARCHAR(6);
