--
-- PostgreSQL database dump
--

\restrict gV9cbKoxC6tIVe1POBEYWvi1F7heX7fdU3N7vXevkt5onJJ7bmWnJtzfAsDmVdy

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    full_name character varying(255)
);


ALTER TABLE public.authors OWNER TO admin;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.authors_id_seq OWNER TO admin;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    year_published integer,
    author_id integer,
    genre character varying(100),
    availability integer
);


ALTER TABLE public.books OWNER TO admin;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_seq OWNER TO admin;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: borrow_records; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.borrow_records (
    id integer NOT NULL,
    borrower character varying(255),
    book_title character varying(255),
    book_id integer,
    borrow_date date,
    return_date date,
    due_date date
);


ALTER TABLE public.borrow_records OWNER TO admin;

--
-- Name: borrow_records_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.borrow_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.borrow_records_id_seq OWNER TO admin;

--
-- Name: borrow_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.borrow_records_id_seq OWNED BY public.borrow_records.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255)
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: borrow_records id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.borrow_records ALTER COLUMN id SET DEFAULT nextval('public.borrow_records_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.authors (id, full_name) FROM stdin;
1	Cal Newport
2	Robert Martin
3	Andrew Hunt
27	Agatha Christie
28	Jane Austen
31	Robin Sharma
32	Gregion Wells
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.books (id, title, author, year_published, author_id, genre, availability) FROM stdin;
3	Deep Work	Cal Newport	2016	1	Self-help	20
1	The Pragmatic Programmer	Andrew Hunt	1999	3	Professional Development	25
12	Murder on the Orient Express	Agatha Christie	1934	27	Mystery	24
13	The Monk Who Sold His Ferrari	Robin Sharma	1997	31	Self-Help/Fiction	12
\.


--
-- Data for Name: borrow_records; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.borrow_records (id, borrower, book_title, book_id, borrow_date, return_date, due_date) FROM stdin;
1	Alexander Wright	Deep Work	3	2026-02-02	2026-03-02	2026-02-20
7	Isaac Ime	The Monk Who Sold His Ferrari	13	2026-04-09	\N	2026-04-23
9	Bobby Weirdal	The Pragmatic Programmer	1	2026-04-09	\N	2026-04-23
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, email, password) FROM stdin;
1	isaac@library.com	$2b$10$4RC8wqsz0HyG5j0c736SMuUTXUX9Jtxhe0q1pUwS2C0SEvo6Kml4q
\.


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.authors_id_seq', 32, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.books_id_seq', 13, true);


--
-- Name: borrow_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.borrow_records_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: borrow_records borrow_records_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.borrow_records
    ADD CONSTRAINT borrow_records_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: borrow_records borrow_records_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.borrow_records
    ADD CONSTRAINT borrow_records_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: books fk_author; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES public.authors(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO admin;


--
-- PostgreSQL database dump complete
--

\unrestrict gV9cbKoxC6tIVe1POBEYWvi1F7heX7fdU3N7vXevkt5onJJ7bmWnJtzfAsDmVdy

