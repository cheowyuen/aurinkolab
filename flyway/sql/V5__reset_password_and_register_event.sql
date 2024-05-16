ALTER TABLE tutors 
    ADD reset_password_token VARCHAR(36),
    ADD reset_token_expiration TIMESTAMP WITH TIME ZONE;

ALTER TABLE students 
    ADD reset_password_token VARCHAR(36),
    ADD reset_token_expiration TIMESTAMP WITH TIME ZONE;  

CREATE TABLE events_students (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES events(id),
    student_id INT REFERENCES students(id),
    tutor_id INT REFERENCES tutors(id)
);