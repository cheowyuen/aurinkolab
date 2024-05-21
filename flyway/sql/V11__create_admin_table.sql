CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(255),
    CONSTRAINT unique_username UNIQUE (username)
);

INSERT INTO admin (username, password)
VALUES 
    ('aurinko_admin', '$2a$10$7wsQQwgeGLL.pbhh2dqATuGiXRFAbt8F5KQO/6TJa1za.4htUGj0W')
ON CONFLICT (username) DO NOTHING;