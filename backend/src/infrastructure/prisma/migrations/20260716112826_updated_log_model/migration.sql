-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `Log_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `Log_instructorId_fkey`;

-- DropIndex
DROP INDEX `Log_adminId_fkey` ON `log`;

-- DropIndex
DROP INDEX `Log_instructorId_fkey` ON `log`;

-- AlterTable
ALTER TABLE `admin` MODIFY `active` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `instructor` MODIFY `active` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `log` MODIFY `instructorId` INTEGER NULL,
    MODIFY `entityType` ENUM('Class', 'Compentence', 'Material', 'Instructor', 'Discipline', 'Area', 'Student', 'Exam', 'Admin') NOT NULL,
    MODIFY `adminId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
