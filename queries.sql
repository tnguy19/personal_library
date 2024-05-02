CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ISBN VARCHAR(15) NOT NULL,
    date_read DATE NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    link VARCHAR(255) NOT NULL
);