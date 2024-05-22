CREATE TABLE partners (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    news_text TEXT NOT NULL,
    date_added TIMESTAMP WITH TIME ZONE NOT NULL
);