/*
  Warnings:

  - You are about to drop the `ProviderInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProviderInfo" DROP CONSTRAINT "ProviderInfo_user_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_provider_id_fkey";

-- DropTable
DROP TABLE "ProviderInfo";

-- CreateTable
CREATE TABLE "providers_info" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT,
    "startHour" TIMESTAMP(3),
    "endHour" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "providers_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "providers_info_user_id_key" ON "providers_info"("user_id");

-- AddForeignKey
ALTER TABLE "providers_info" ADD CONSTRAINT "providers_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
