/*
  Warnings:

  - Added the required column `status` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JoinStatus" AS ENUM ('reject', 'accept', 'pending');

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "status" "JoinStatus" NOT NULL;
