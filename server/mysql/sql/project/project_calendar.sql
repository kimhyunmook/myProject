CREATE TABLE `project_calendar` (
	`num` INT NOT NULL AUTO_INCREMENT,
	`project_name` VARCHAR(200) NOT NULL,
	`subject` VARCHAR(200) NOT NULL,
	`content` VARCHAR(200) NOT NULL,
	-- `description` VARCHAR(500) NULL DEFAULT NULL,
	`date` VARCHAR(70) NOT NULL,
	`userId` VARCHAR(30) NOT NULL,
	`achieve` VARCHAR(10) NULL,
	PRIMARY KEY (`num`)
)
;
