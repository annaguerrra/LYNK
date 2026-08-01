/*
  Warnings:

  - The values [Class,Compentence,Material,Instructor,Discipline,Area,Student,Exam,Admin] on the enum `Log_entityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `log` MODIFY `entityType` ENUM('CLASS', 'COMPENTENCE', 'MATERIAL', 'INSTRUCTOR', 'DISCIPLINE', 'AREA', 'STUDENT', 'EXAM', 'ADMIN') NOT NULL;
