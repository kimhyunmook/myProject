CREATE TABLE `gallery` (
    `no` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `subject` varchar(100) NOT NULL,
    `content` varchar(500) NOT NULL,
    `img` varchar(255),
    `time` varchar(20) NOT NULL,
    `id` varchar(30) NOT NULL,
    `board_type` varchar(30) NOT NULL
);