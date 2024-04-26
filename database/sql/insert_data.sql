INSERT INTO events (name, date, place, vehicle, engine, schedule, tutor_id, education_center_id, start_date, end_date, image)
VALUES
    ('Visit to Keravan Energia''s Solar Plant', '04 Apr 2024', 'Kerava, Finland', 'N/A', 'N/A', NULL, NULL, 1, '2024-04-04', '2024-04-04', '/src/assets/Kerava.jpg'),
    ('Engineering Hackathon-1', 'Apr - May 2024', 'Espoo, Finland', 'Blue Boat', 'Solar-electric', NULL, 1, 1, '2024-04-01', '2024-05-31', '/src/assets/Aalto.jpeg'),
    ('Engineering Hackathon-2', 'Apr - May 2024', 'Espoo, Finland', 'Orange Boat', 'Solar-electric', NULL, 1, 1, '2024-04-01', '2024-05-31', '/src/assets/Aalto.jpeg'),
    ('Engineering Hackathon-3', 'Apr - May 2024', 'Sigulda, Latvia', 'Green Boat', 'Solar-electric', NULL, NULL, 1, '2024-04-01', '2024-05-31', '/src/assets/Sigulda.png'),
    ('Solar Regatta', '01 Jun 2024', 'Helsinki, Finland', 'Boat', 'Solar-electric', NULL, NULL, 1, '2024-06-01', '2024-06-01', '/src/assets/Helsinki.png'),
    ('Training for Tutors', '28 - 29 Aug 2024', 'Online', 'Boat', 'Hydrogen-driven and solar-electric', NULL, NULL, 1, '2024-08-28', '2024-08-29', '/src/assets/Aalto.jpeg'),
    ('Engineering Hackathon-4', 'Sep - Oct 2024', 'Espoo, Finland', 'Go-karts', 'Solar-electric', NULL, 1, 1, '2024-09-01', '2024-10-31', '/src/assets/Aalto.jpeg'),
    ('Engineering Hackathon-5', 'Sep - Oct 2024', 'Espoo, Finland', 'Go-karts', 'Solar-electric', NULL, 1, 1, '2024-09-01', '2024-10-31', '/src/assets/Aalto.jpeg'),
    ('Solar Race', '26 Oct 2024', 'Vantaa, Finland', 'Go-karts', 'Solar-electric', NULL, NULL, 1, '2024-10-26', '2024-10-26', '/src/assets/Vantaa.jpg'),

INSERT INTO education_centers (name, address, email, contact_no)
VALUES
    ('Aurinko Lab', 'Espoo, Finland', 'info@aurinkolab.fi', '+35845312338');

INSERT INTO tutors (first_name, email, has_certificate, image, education_center_id, completed_vehicles, is_estimate, display_on_website)
VALUES 
    ('Tony', 'tony.poppel@gmail.com', true, '/src/assets/tony.jpeg', 1, 300, true, true),
    ('Olga', 'olgakairova@gmail.com', true, '/src/assets/olga.jpeg', 1, 2, false, true);