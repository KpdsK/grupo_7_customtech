CREATE TABLE `user`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `erased` TINYINT(1) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `id_profile` BIGINT NULL
);
ALTER TABLE
    `user` ADD INDEX `user_id_profile_index`(`id_profile`);
CREATE TABLE `category`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` BIGINT NOT NULL
);
CREATE TABLE `bills_products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_bills` INT NOT NULL,
    `id_products` INT NOT NULL,
    `cantidad` INT NOT NULL,
    `price` INT NOT NULL
);
ALTER TABLE
    `bills_products` ADD INDEX `bills_products_id_bills_index`(`id_bills`);
ALTER TABLE
    `bills_products` ADD INDEX `bills_products_id_products_index`(`id_products`);
CREATE TABLE `Products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` VARCHAR(255) NULL,
    `erased` TINYINT(1) NOT NULL,
    `id_category` INT NULL
);
ALTER TABLE
    `Products` ADD INDEX `products_id_category_index`(`id_category`);
CREATE TABLE `Product_image`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `image` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `id_products` INT NOT NULL
);
CREATE TABLE `Profile`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `bills`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `total` ENUM('') NOT NULL,
    `fecha` DATE NOT NULL,
    `id_user` INT NOT NULL
);
ALTER TABLE
    `bills` ADD INDEX `bills_id_user_index`(`id_user`);
ALTER TABLE
    `bills_products` ADD CONSTRAINT `bills_products_id_bills_foreign` FOREIGN KEY(`id_bills`) REFERENCES `bills`(`id`);
ALTER TABLE
    `Products` ADD CONSTRAINT `products_id_category_foreign` FOREIGN KEY(`id_category`) REFERENCES `category`(`id`);
ALTER TABLE
    `bills_products` ADD CONSTRAINT `bills_products_id_products_foreign` FOREIGN KEY(`id_products`) REFERENCES `Products`(`id`);
ALTER TABLE
    `user` ADD CONSTRAINT `user_id_profile_foreign` FOREIGN KEY(`id_profile`) REFERENCES `Profile`(`id`);
ALTER TABLE
    `user` ADD CONSTRAINT `user_id_foreign` FOREIGN KEY(`id`) REFERENCES `bills`(`id`);
ALTER TABLE
    `Product_image` ADD CONSTRAINT `product_image_id_products_foreign` FOREIGN KEY(`id_products`) REFERENCES `Products`(`id`);