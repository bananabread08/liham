/*
  Warnings:

  - You are about to drop the column `mainContactId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_mainContactId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mainContactId";

-- CreateTable
CREATE TABLE "_ContactsList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsList_AB_unique" ON "_ContactsList"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsList_B_index" ON "_ContactsList"("B");

-- AddForeignKey
ALTER TABLE "_ContactsList" ADD CONSTRAINT "_ContactsList_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsList" ADD CONSTRAINT "_ContactsList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
