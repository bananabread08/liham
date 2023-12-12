-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mainContactId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mainContactId_fkey" FOREIGN KEY ("mainContactId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
