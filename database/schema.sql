BEGIN TRANSACTION;

CREATE SEQUENCE seq_author_id
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE SEQUENCE seq_award_id
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE authors (
    author_id int DEFAULT nextval('seq_author_id'::regclass) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,

    CONSTRAINT PK_author_id PRIMARY KEY (author_id)
);

CREATE TABLE books (
    isbn int NOT NULL,
    format varchar(25),
    title varchar(25),
    author_id int NOT NULL,

    CONSTRAINT PK_books PRIMARY KEY (isbn, format),
    CONSTRAINT chk_format CHECK (format IN ('Hardbound', 'Paperback', 'Digital Only')),
    CONSTRAINT ref_author_id FOREIGN KEY (author_id) REFERENCES authors (author_id)
);

CREATE TABLE awards (
    award_id int DEFAULT nextval('seq_award_id'::regclass) NOT NULL,
    award_name varchar(50),

    CONSTRAINT PK_awards PRIMARY KEY (award_id)
);

CREATE TABLE book_awards (
    isbn int NOT NULL,
    format varchar(25) NOT NULL,
    award_id int NOT NULL,

    CONSTRAINT PK_book_awards PRIMARY KEY (isbn, format, award_id),
    CONSTRAINT ref_book_awards_isbn FOREIGN KEY (isbn, format) REFERENCES books (isbn, format),
    CONSTRAINT ref_book_awards_award_id FOREIGN KEY (award_id) REFERENCES awards (award_id)
);

CREATE TABLE author_awards (
    author_id int NOT NULL,
    award_id int NOT NULL,

    CONSTRAINT PK_author_awards PRIMARY KEY (author_id, award_id),
    CONSTRAINT ref_author_awards_author_id FOREIGN KEY (author_id) REFERENCES authors (author_id),
    CONSTRAINT ref_author_awards_award_id FOREIGN KEY (award_id) REFERENCES awards (award_id)

);

COMMIT TRANSACTION;

