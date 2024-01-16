CREATE TABLE `adm_menu` (
	`menu_id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`href` VARCHAR(9999) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`menu_type` VARCHAR(100) NULL DEFAULT '' COLLATE 'utf8mb4_0900_ai_ci',
	`description` VARCHAR(50) NULL DEFAULT '' COLLATE 'utf8mb4_0900_ai_ci',
	`depth` INT(10) NULL DEFAULT '0' COMMENT 'true:>=1/flase:0',
	`admin` INT(10) NULL DEFAULT '0',
	`parent` INT(10) NULL DEFAULT '0' COMMENT 'parent:menu_id',
	`custom` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`custom_comment` VARCHAR(400) NULL DEFAULT NULL COMMENT 'custom exits' COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`menu_id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
