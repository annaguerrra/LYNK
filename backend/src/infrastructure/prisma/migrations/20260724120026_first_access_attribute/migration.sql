-- AlterTable
ALTER TABLE `admin` ADD COLUMN `firstAccess` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `instructor` ADD COLUMN `firstAccess` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `firstAccess` BOOLEAN NOT NULL DEFAULT false;
