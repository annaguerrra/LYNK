/*
  Warnings:

  - The values [Elotronics] on the enum `Instructor_specialty` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_classtocompentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_compentencetodiscipline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_compentencetoexam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `compentence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_classtocompentence` DROP FOREIGN KEY `_ClassToCompentence_A_fkey`;

-- DropForeignKey
ALTER TABLE `_classtocompentence` DROP FOREIGN KEY `_ClassToCompentence_B_fkey`;

-- DropForeignKey
ALTER TABLE `_compentencetodiscipline` DROP FOREIGN KEY `_CompentenceToDiscipline_A_fkey`;

-- DropForeignKey
ALTER TABLE `_compentencetodiscipline` DROP FOREIGN KEY `_CompentenceToDiscipline_B_fkey`;

-- DropForeignKey
ALTER TABLE `_compentencetoexam` DROP FOREIGN KEY `_CompentenceToExam_A_fkey`;

-- DropForeignKey
ALTER TABLE `_compentencetoexam` DROP FOREIGN KEY `_CompentenceToExam_B_fkey`;

-- AlterTable
ALTER TABLE `instructor` MODIFY `specialty` ENUM('Digital', 'Eletronics') NOT NULL;

-- DropTable
DROP TABLE `_classtocompentence`;

-- DropTable
DROP TABLE `_compentencetodiscipline`;

-- DropTable
DROP TABLE `_compentencetoexam`;

-- DropTable
DROP TABLE `compentence`;

-- CreateTable
CREATE TABLE `Competence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `numOfHours` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClassToCompetence` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClassToCompetence_AB_unique`(`A`, `B`),
    INDEX `_ClassToCompetence_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CompetenceToExam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CompetenceToExam_AB_unique`(`A`, `B`),
    INDEX `_CompetenceToExam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CompetenceToDiscipline` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CompetenceToDiscipline_AB_unique`(`A`, `B`),
    INDEX `_CompetenceToDiscipline_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClassToCompetence` ADD CONSTRAINT `_ClassToCompetence_A_fkey` FOREIGN KEY (`A`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassToCompetence` ADD CONSTRAINT `_ClassToCompetence_B_fkey` FOREIGN KEY (`B`) REFERENCES `Competence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompetenceToExam` ADD CONSTRAINT `_CompetenceToExam_A_fkey` FOREIGN KEY (`A`) REFERENCES `Competence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompetenceToExam` ADD CONSTRAINT `_CompetenceToExam_B_fkey` FOREIGN KEY (`B`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompetenceToDiscipline` ADD CONSTRAINT `_CompetenceToDiscipline_A_fkey` FOREIGN KEY (`A`) REFERENCES `Competence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompetenceToDiscipline` ADD CONSTRAINT `_CompetenceToDiscipline_B_fkey` FOREIGN KEY (`B`) REFERENCES `Discipline`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
