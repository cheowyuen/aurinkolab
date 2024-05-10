ALTER TABLE tutors 
    ADD date_registered TIMESTAMP WITH TIME ZONE, 
    ADD is_approved BOOLEAN DEFAULT false,
    ADD verified BOOLEAN DEFAULT false,
    ADD verification_token VARCHAR(36),
    ADD token_expiration TIMESTAMP WITH TIME ZONE;

ALTER TABLE students 
    ADD date_registered TIMESTAMP WITH TIME ZONE,
    ADD verified BOOLEAN DEFAULT false,
    ADD verification_token VARCHAR(36),
    ADD token_expiration TIMESTAMP WITH TIME ZONE;  

UPDATE tutors 
SET is_approved = true, 
    verified = true 
WHERE id IN (1, 2, 3);