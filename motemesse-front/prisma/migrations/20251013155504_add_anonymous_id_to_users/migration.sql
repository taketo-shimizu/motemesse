/*
  Warnings:

  - A unique constraint covering the columns `[anonymous_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "anonymous_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_anonymous_id_key" ON "users"("anonymous_id");
