/*
  Warnings:

  - You are about to drop the column `instrutorId` on the `log` table. All the data in the column will be lost.
  - You are about to drop the column `instrutorId` on the `student` table. All the data in the column will be lost.
  - You are about to alter the column `userType` on the `student` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.
  - You are about to drop the `instrutor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `instructorId` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `Log_instrutorId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_instrutorId_fkey`;

-- DropIndex
DROP INDEX `Log_instrutorId_fkey` ON `log`;

-- DropIndex
DROP INDEX `Student_instrutorId_fkey` ON `student`;

-- AlterTable
ALTER TABLE `log` DROP COLUMN `instrutorId`,
    ADD COLUMN `instructorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `instrutorId`,
    ADD COLUMN `instructorId` INTEGER NOT NULL,
    MODIFY `userType` ENUM('ADMIN', 'INSTRUCTOR', 'STUDENT') NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE `instrutor`;

-- CreateTable
CREATE TABLE `Instructor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userType` ENUM('ADMIN', 'INSTRUCTOR', 'STUDENT') NOT NULL DEFAULT 'INSTRUCTOR',
    `specialty` ENUM('Digital', 'Elotronics') NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `attachmentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
