/*
  Warnings:

  - You are about to drop the column `attachmentId` on the `exam` table. All the data in the column will be lost.
  - You are about to drop the column `attachmentId` on the `material` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `competence` MODIFY `numOfClasses` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `exam` DROP COLUMN `attachmentId`;

-- AlterTable
ALTER TABLE `material` DROP COLUMN `attachmentId`;

-- CreateTable
CREATE TABLE `ExamAttachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `examId` INTEGER NOT NULL,
    `attachmentId` VARCHAR(191) NOT NULL,

    INDEX `ExamAttachment_examId_idx`(`examId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialAttachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `materialId` INTEGER NOT NULL,
    `attachmentId` VARCHAR(191) NOT NULL,

    INDEX `MaterialAttachment_materialId_idx`(`materialId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExamAttachment` ADD CONSTRAINT `ExamAttachment_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialAttachment` ADD CONSTRAINT `MaterialAttachment_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
