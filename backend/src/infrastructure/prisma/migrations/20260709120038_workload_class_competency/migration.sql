/*
  Warnings:

  - You are about to drop the column `numOfHours` on the `competence` table. All the data in the column will be lost.
  - Added the required column `workLoad` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfClasses` to the `Competence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` ADD COLUMN `workLoad` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `competence` DROP COLUMN `numOfHours`,
    ADD COLUMN `numOfClasses` INTEGER NOT NULL;
