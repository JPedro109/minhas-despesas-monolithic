-- AlterTable
ALTER TABLE "user_verification_codes" ALTER COLUMN "type" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "verification_code_expiry_date" DROP NOT NULL;
