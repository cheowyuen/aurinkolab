ALTER TABLE regatta_teams 
    ADD event_ID INT NOT NULL REFERENCES events(id);