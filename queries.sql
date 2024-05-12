CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    ISBN VARCHAR(15) NOT NULL,
    date_read DATE NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    link TEXT NOT NULL
);

INSERT INTO books (title, isbn, date_read, rating, comment, link)
VALUES ('Harry Potter and the Philosophers'' Stone','9781408855652', '2018-10-01, 10', 'Nice book', 'https://a.co/d/9CR24K6');
