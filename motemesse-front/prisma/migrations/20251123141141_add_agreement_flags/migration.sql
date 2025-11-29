-- AlterTable
ALTER TABLE "users" ADD COLUMN     "privacy_policy_agreed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "terms_agreed" BOOLEAN NOT NULL DEFAULT false;
