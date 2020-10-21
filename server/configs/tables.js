module.exports = {
    users: (
        "CREATE TABLE `users` (" +
        " `id` int(11) NOT NULL AUTO_INCREMENT," +
        " `username` varchar(20) NOT NULL," +
        " `first_name` varchar(25) NOT NULL," +
        " `last_name` varchar(25) NOT NULL," + 
        " `email` varchar(60) NOT NULL," +
        " `password` varchar(100) NOT NULL," +
        " `pro_pic` longtext," +
        " `user_id` varchar(100)," +
        " `verified` int(2) NOT NULL DEFAULT 0," +
        " `admin` int (1) NOT NULL DEFAULT 0," +
        " `type` varchar(20) NOT NULL," +
        " PRIMARY KEY (`id`)" +
        ") ENGINE=InnoDB"
    ),
    tokens : (
        "CREATE TABLE `tokens` (" +
        " `id` int(11) NOT NULL AUTO_INCREMENT," +
        " `username` varchar(20) NOT NULL," +
        " `token` varchar(300) NOT NULL," +
        " `type` varchar(100)," +
        " PRIMARY KEY (`id`)" +
        ") ENGINE=InnoDB"
    ),
    licenses : (
        "CREATE TABLE `licenses` (" +
        " `id` int(11) NOT NULL AUTO_INCREMENT," +
        " `owner` varchar(20) NOT NULL," +
        " `user` varchar(300) NOT NULL," +
        " `playlist_id` varchar(200)," +
        " `playlist_name` varchar(200)," +
        " `access_key` varchar(256)," +
        " PRIMARY KEY (`id`)" +
        ") ENGINE=InnoDB"
    ),
    delegates : (
        "CREATE TABLE `delegates` (" +
        " `id` int(11) NOT NULL AUTO_INCREMENT," +
        " `user_id` varchar(30) NOT NULL," +
        " `friend_id` varchar(30) NOT NULL," +
        " PRIMARY KEY (`id`)" +
        ") ENGINE=InnoDB"
    )
}