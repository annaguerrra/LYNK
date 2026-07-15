/*
  Warnings:

  - You are about to drop the column `name` on the `instructor` table. All the data in the column will be lost.
  - You are about to drop the column `attachmentId` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `instructorId` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `student` table. All the data in the column will be lost.
  - You are about to drop the `_areatostudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_areatostudent` DROP FOREIGN KEY `_AreaToStudent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_areatostudent` DROP FOREIGN KEY `_AreaToStudent_B_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_instructorId_fkey`;

-- DropIndex
DROP INDEX `Student_instructorId_fkey` ON `student`;

-- AlterTable
ALTER TABLE `instructor` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `log` ADD COLUMN `adminId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `attachmentId`,
    DROP COLUMN `course`,
    DROP COLUMN `instructorId`,
    DROP COLUMN `name`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `_areatostudent`;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userType` ENUM('ADMIN', 'INSTRUCTOR', 'STUDENT') NOT NULL DEFAULT 'ADMIN',
    `specialty` ENUM('Digital', 'Eletronics') NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `attachmentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
