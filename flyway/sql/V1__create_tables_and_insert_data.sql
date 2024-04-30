CREATE TABLE education_centers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact_no VARCHAR(30) NOT NULL
);

CREATE TABLE tutors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    contact_no VARCHAR(30),
    role VARCHAR(255),
    has_certificate BOOLEAN NOT NULL DEFAULT false,
    image TEXT,
    education_center_id INT NOT NULL REFERENCES education_centers(id),
    completed_vehicles NUMERIC(5,1) NOT NULL DEFAULT 0,
    is_estimate BOOLEAN NOT NULL DEFAULT false,
    display_on_website BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT unique_tutor_details UNIQUE (first_name, email)
);

INSERT INTO education_centers (name, address, email, contact_no)
VALUES
    ('Aurinko Lab', 'Espoo, Finland', 'info@aurinkolab.fi', '+35845312338')
ON CONFLICT (email) DO NOTHING;

INSERT INTO tutors (first_name, email, has_certificate, image, education_center_id, completed_vehicles, is_estimate, display_on_website)
VALUES 
    ('Tony', 'tony.poppel@gmail.com', true, '/src/assets/tony.jpeg', 1, 300, true, true),
    ('Olga', 'olgakairova@gmail.com', true, '/src/assets/olga.jpeg', 1, 2, false, true),
    ('Rostislav', 'N/A', false, '/src/assets/boat-icon.png', 1, 0.5, false, true)
ON CONFLICT (first_name, email) DO NOTHING;