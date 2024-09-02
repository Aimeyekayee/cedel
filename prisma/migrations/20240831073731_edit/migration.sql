/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "Firstname" TEXT NOT NULL,
ADD COLUMN     "Lastname" TEXT NOT NULL,
ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
