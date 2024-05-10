CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ISBN VARCHAR(15) NOT NULL,
    date_read DATE NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    link VARCHAR(255) NOT NULL
);

INSERT INTO books (title, isbn, date_read, rating, comment, link)
VALUES ('Harry Potter and the Philosophers'' Stone','9781408855652', '2018-10-01, 10', 'Nice book', 'https://a.co/d/9CR24K6');

CREATE TABLE cover_images (
	id SERIAL PRIMARY KEY,
	book_id INTEGER REFERENCES books(id),
	image bytea
);

SELECT *
FROM books JOIN cover_images
ON books.id = cover_images.book_id;