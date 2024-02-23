CREATE TABLE `project_memo` (
	`unique_num` INT NOT NULL AUTO_INCREMENT,
    `num` INT NOT NULL DEFAULT 1,
	`project_name` VARCHAR(200) NOT NULL,
	`memo` VARCHAR(1000) NOT NULL,
	`date` VARCHAR(70) NOT NULL,
	`userId` VARCHAR(30) NOT NULL,
	PRIMARY KEY (`unique_num`)
)
;
