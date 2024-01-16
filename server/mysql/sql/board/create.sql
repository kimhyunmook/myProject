CREATE TABLE `?` (
	`w_id` INT(10) NOT NULL AUTO_INCREMENT,
	`w_num` INT(10) NOT NULL DEFAULT '0',
	`w_parent` INT(10) NOT NULL DEFAULT '0',
	`subject` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`content` VARCHAR(9999) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`w_comment` INT(10) NOT NULL DEFAULT '0',
	`d_time` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`w_time` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`user_id` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`hit` INT(10) NOT NULL DEFAULT '0',
	`reply_count` INT(10) NOT NULL DEFAULT '0',
	`board_type` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`notice` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`w_id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;