CREATE TABLE education_centers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_no VARCHAR(30) NOT NULL
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact_no VARCHAR(30) NOT NULL,
    passedQuiz BOOLEAN DEFAULT false,
    education_center_id INT NOT NULL REFERENCES education_centers(id)
);

CREATE TABLE tutors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    contact_no VARCHAR(30),
    role VARCHAR(255),
    has_certificate BOOLEAN DEFAULT false,
    image TEXT,
    education_center_id INT NOT NULL REFERENCES education_centers(id),
    completed_vehicles NUMERIC(5,1) NOT NULL DEFAULT 0,
    is_estimate BOOLEAN NOT NULL DEFAULT false,
    display_on_website BOOLEAN NOT NULL DEFAULT false
);

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
    image VARCHAR(255) NOT NULL
);

CREATE TABLE events_students (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES events(id),
    student_id INT NOT NULL REFERENCES students(id),
    tutor_id INT NOT NULL REFERENCES tutors(id)
);

CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id),
    score INT NOT NULL,
    totalQuestions INT NOT NULL,
    grade DECIMAL(3,1) NOT NULL,
    datetime TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE regattas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    vehicle VARCHAR(255) NOT NULL,
    engine VARCHAR(255) NOT NULL,
    isActive BOOLEAN DEFAULT false
);

CREATE TABLE regattas_teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    captain VARCHAR(255) NOT NULL,
    team_members TEXT NOT NULL,
    contact_no VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL,
    regatta_id INT NOT NULL REFERENCES regattas(id)
);