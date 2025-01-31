/*
  Warnings:

  - You are about to drop the column `active` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `renewable` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `subscriptions` table. All the data in the column will be lost.
  - Added the required column `subscription_external_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "active",
DROP COLUMN "amount",
DROP COLUMN "end_date",
DROP COLUMN "renewable",
DROP COLUMN "start_date",
ADD COLUMN     "subscription_external_id" VARCHAR(50) NOT NULL;
