CREATE TABLE regatta_teams (
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(255) NOT NULL,
    team_leader VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact_no VARCHAR(30) NOT NULL,
    team_logo TEXT
);

CREATE TABLE waiting_list (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES events(id),
    student_id INT REFERENCES students(id),
    tutor_id INT REFERENCES tutors(id),
    registration_time TIMESTAMP WITH TIME ZONE,
    registered BOOLEAN DEFAULT false
);

ALTER TABLE events 
    ADD event_type VARCHAR(255),
    ADD max_participants INT;

ALTER TABLE events_students 
    ADD registration_time TIMESTAMP WITH TIME ZONE,
    ADD registered BOOLEAN DEFAULT false;

UPDATE events
SET event_type = 'hackathon'
WHERE id IN (1, 2, 3, 4, 7, 8);

UPDATE events
SET event_type = 'masterclass'
WHERE id = 6;

UPDATE events
SET event_type = 'regatta'
WHERE id IN (5, 9);