CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    vehicle VARCHAR(255),
    engine VARCHAR(255),
    schedule TEXT,
    tutor_id INT REFERENCES tutors(id),
    education_center_id INT NOT NULL REFERENCES education_centers(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    image VARCHAR(255) NOT NULL,
    CONSTRAINT unique_event_details UNIQUE (name, start_date, end_date)
);

CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id),
    score INT NOT NULL,
    totalquestions INT NOT NULL,
    grade DECIMAL(3,1) NOT NULL,
    datetime TIMESTAMP WITH TIME ZONE NOT NULL
);

INSERT INTO events (name, date, place, vehicle, engine, schedule, tutor_id, education_center_id, start_date, end_date, image)
VALUES
    ('Visit to Keravan Energia''s Solar Plant', '04 Apr 2024', 'Kerava, Finland', 'N/A', 'N/A', NULL, NULL, 1, '2024-04-04', '2024-04-04', '/src/assets/Kerava.jpg'),
    ('Engineering Hackathon-1', 'Apr - May 2024', 'Espoo, Finland', 'Blue Boat', 'Solar-electric', NULL, 1, 1, '2024-04-01', '2024-05-31', '/src/assets/Aalto.jpeg'),
    ('Engineering Hackathon-2', 'Apr - May 2024', 'Espoo, Finland', 'Orange Boat', 'Solar-electric', NULL, 1, 1, '2024-04-01', '2024-05-31', '/src/assets/Aalto.jpeg'),
    ('Engineering Hackathon-3', 'Apr - May 2024', 'Sigulda, Latvia', 'Green Boat', 'Solar-electric', NULL, 3, 1, '2024-04-01', '2024-05-31', '/src/assets/Sigulda.png'),
    ('Solar Regatta', '01 Jun 2024', 'Helsinki, Finland', 'Boat', 'Solar-electric', NULL, NULL, 1, '2024-06-01', '2024-06-01', '/src/assets/Helsinki.png'),
    ('Training for Tutors', '28 - 29 Aug 2024', 'Online', 'Boat', 'Hydrogen-driven and solar-electric', NULL, NULL, 1, '2024-08-28', '2024-08-29', '/src/assets/Aalto.jpeg'),
    ('Engineering Hackathon-4', 'Sep - Oct 2024', 'Espoo, Finland', 'Go-karts', 'Solar-electric', NULL, 1, 1, '2024-09-01', '2024-10-31', '/src/assets/Aalto.jpeg'),
    ('Engineering Hackathon-5', 'Sep - Oct 2024', 'Espoo, Finland', 'Go-karts', 'Solar-electric', NULL, 1, 1, '2024-09-01', '2024-10-31', '/src/assets/Aalto.jpeg'),
    ('Solar Race', '26 Oct 2024', 'Vantaa, Finland', 'Go-karts', 'Solar-electric', NULL, NULL, 1, '2024-10-26', '2024-10-26', '/src/assets/Vantaa.jpg')
ON CONFLICT (name, start_date, end_date) DO NOTHING;