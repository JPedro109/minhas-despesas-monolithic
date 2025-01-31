/*
  Warnings:

  - Added the required column `plan_external_id` to the `plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "plan_external_id" VARCHAR(50) NOT NULL;
