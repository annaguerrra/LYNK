-- AlterTable
ALTER TABLE `admin` MODIFY `firstAccess` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `instructor` MODIFY `firstAccess` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `student` MODIFY `firstAccess` BOOLEAN NOT NULL DEFAULT true;
