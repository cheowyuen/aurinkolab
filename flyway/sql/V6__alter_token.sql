ALTER TABLE tutors 
    ALTER COLUMN reset_password_token TYPE VARCHAR(255);

ALTER TABLE students 
    ALTER COLUMN reset_password_token TYPE VARCHAR(255);  