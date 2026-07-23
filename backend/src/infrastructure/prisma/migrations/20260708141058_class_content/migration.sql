/*
  Warnings:

  - The values [Elotronics] on the enum `Instructor_specialty` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `action` on the `log` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - Added the required column `entityId` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityType` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `instructor` MODIFY `specialty` ENUM('Digital', 'Eletronics') NOT NULL;

-- AlterTable
ALTER TABLE `log` ADD COLUMN `entityId` INTEGER NOT NULL,
    ADD COLUMN `entityType` ENUM('Class', 'Compentence', 'Material', 'Instructor', 'Discipline', 'Area', 'Student', 'Exam') NOT NULL,
    MODIFY `action` ENUM('CREATED', 'DELETED', 'UPDATED') NOT NULL;
