/*
  Warnings:

  - You are about to alter the column `roleId` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(225)` to `Int`.
  - You are about to drop the `_roletouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_roletouser` DROP FOREIGN KEY `_roleTouser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_roletouser` DROP FOREIGN KEY `_roleTouser_B_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `roleId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_roletouser`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
