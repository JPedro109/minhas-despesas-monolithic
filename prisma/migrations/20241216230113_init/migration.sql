-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "verified_email" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "expense_name" VARCHAR(12) NOT NULL,
    "expense_value" DOUBLE PRECISION NOT NULL,
    "due_date" DATE NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "customer_id" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_consents" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "consent_version" VARCHAR(10) NOT NULL,
    "ip_address" VARCHAR(50) NOT NULL,
    "user_agent" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "token" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_verification_codes" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "verification_code" VARCHAR(60) NOT NULL,
    "verification_code_expiry_date" TIMESTAMP(3) NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "user_verification_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_histories" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "expense_id" UUID NOT NULL,
    "expense_name" VARCHAR(12) NOT NULL,
    "expense_value" DOUBLE PRECISION NOT NULL,
    "due_date" DATE NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL,
    "renewable" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extracts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "reference_year" INTEGER NOT NULL,
    "reference_month" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "extracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "duration_in_days" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" UUID NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PrismaActionToPrismaPlan" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PrismaActionToPrismaPlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_user_id_key" ON "customers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_consents_user_id_key" ON "user_consents"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_user_id_key" ON "payment_methods"("user_id");

-- CreateIndex
CREATE INDEX "_PrismaActionToPrismaPlan_B_index" ON "_PrismaActionToPrismaPlan"("B");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_verification_codes" ADD CONSTRAINT "user_verification_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_histories" ADD CONSTRAINT "payment_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extracts" ADD CONSTRAINT "extracts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrismaActionToPrismaPlan" ADD CONSTRAINT "_PrismaActionToPrismaPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrismaActionToPrismaPlan" ADD CONSTRAINT "_PrismaActionToPrismaPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
