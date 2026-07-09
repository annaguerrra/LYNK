/*
  Warnings:

  - You are about to drop the column `workLoad` on the `class` table. All the data in the column will be lost.
  - Added the required column `workLoad` to the `Discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` DROP COLUMN `workLoad`;

-- AlterTable
ALTER TABLE `discipline` ADD COLUMN `workLoad` INTEGER NOT NULL;
