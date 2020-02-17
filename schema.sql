-- create mysql docker container
-- docker exec -it mysql mysql -uroot -proot

CREATE DATABASE ipark;
SELECT DATABASE();
USE ipark;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(256),
    password_hash VARCHAR(256),
    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users(email, password_hash) VALUES ('test-email', 'test-password');
