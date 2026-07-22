/*
  Warnings:

  - Added the required column `color` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityName` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `area` ADD COLUMN `color` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `log` ADD COLUMN `entityName` VARCHAR(191) NOT NULL;
