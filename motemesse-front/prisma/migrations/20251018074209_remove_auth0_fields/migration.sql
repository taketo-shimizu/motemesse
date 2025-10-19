/*
  Warnings:

  - You are about to drop the column `auth0_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_auth0_id_key";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth0_id",
DROP COLUMN "email",
DROP COLUMN "email_verified",
DROP COLUMN "picture";

-- RenameIndex
ALTER INDEX "users_anonymous_id_key" RENAME TO "users_anonymousId_key";
