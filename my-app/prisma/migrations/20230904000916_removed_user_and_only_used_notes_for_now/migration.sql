/*
  Warnings:

  - You are about to drop the `todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `todo_user_id_fkey`;

-- DropTable
DROP TABLE `todo`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Todo` (
    `todo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`todo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
