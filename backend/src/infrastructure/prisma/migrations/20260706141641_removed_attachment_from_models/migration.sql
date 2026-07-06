/*
  Warnings:

  - You are about to drop the column `attachmentId` on the `area` table. All the data in the column will be lost.
  - You are about to drop the column `attachmentId` on the `discipline` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `area` DROP COLUMN `attachmentId`;

-- AlterTable
ALTER TABLE `discipline` DROP COLUMN `attachmentId`;
