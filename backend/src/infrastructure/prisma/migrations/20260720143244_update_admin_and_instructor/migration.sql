/*
  Warnings:

  - You are about to drop the column `createdAt` on the `discipline` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_disciplineId_fkey`;

-- DropForeignKey
ALTER TABLE `material` DROP FOREIGN KEY `Material_classId_fkey`;

-- DropForeignKey
ALTER TABLE `material` DROP FOREIGN KEY `Material_disciplineId_fkey`;

-- DropIndex
DROP INDEX `Class_disciplineId_fkey` ON `class`;

-- DropIndex
DROP INDEX `Material_classId_fkey` ON `material`;

-- DropIndex
DROP INDEX `Material_disciplineId_fkey` ON `material`;

-- AlterTable
ALTER TABLE `admin` MODIFY `attachmentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `discipline` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `instructor` MODIFY `attachmentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_disciplineId_fkey` FOREIGN KEY (`disciplineId`) REFERENCES `Discipline`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_disciplineId_fkey` FOREIGN KEY (`disciplineId`) REFERENCES `Discipline`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
