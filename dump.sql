--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

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
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now(),
    "userId" integer NOT NULL
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "daysToExpire" integer DEFAULT 5,
    "userId" integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (3, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-f228e76e995d48a48cc84e4e5476cb71', 'f-OlXROVZlLGNjUQ6qbTF', 0, '2023-05-19 12:31:56.142428', 1);
INSERT INTO public.links VALUES (6, 'https://www.twitch.tv/mdobz', 'ib1jMQxh_Fxm7pcOPHdHF', 0, '2023-05-19 12:40:09.395197', 1);
INSERT INTO public.links VALUES (7, 'https://www.twitch.tv/mdobz', 'TWi-CZqiV4AkfowjXbhob', 0, '2023-05-19 12:40:29.95751', 1);
INSERT INTO public.links VALUES (8, 'https://www.twitch.tv/mdobz', 'DYFmB-InLg0LD7Zwpsw_8', 0, '2023-05-19 12:43:52.643871', 1);
INSERT INTO public.links VALUES (9, 'https://www.twitch.tv/mdobz', 'Eq78XVaxPZKYsvt78EJMg', 0, '2023-05-20 10:10:18.056869', 3);
INSERT INTO public.links VALUES (1, 'https://www.globo.com/', 'sXLcZmDDtPBAiFHNVz2HL', 2, '2023-05-19 12:19:21.996787', 1);
INSERT INTO public.links VALUES (2, 'https://github.com/DiegoBeker/shortly-api', 'Bo3717D2znC7K5ncKFnRP', 12, '2023-05-19 12:24:46.714039', 1);
INSERT INTO public.links VALUES (10, 'https://www.twitch.tv/mdobz', 'UT_6hhzhVzzMC2SmrQkh_', 0, '2023-05-20 13:55:20.037538', 4);
INSERT INTO public.links VALUES (11, 'https://www.twitch.tv/mdobz', '00SPVC-fUQS1puqf2UOz6', 0, '2023-05-20 13:55:21.893742', 4);
INSERT INTO public.links VALUES (12, 'https://www.twitch.tv/mdobz', 'T2OoZmKtXT_VWhL9kV9H2', 0, '2023-05-20 13:55:22.525436', 4);
INSERT INTO public.links VALUES (13, 'https://www.twitch.tv/mdobz', 'CScp5dxCal5rci3-ZabtC', 0, '2023-05-20 13:55:23.038637', 4);
INSERT INTO public.links VALUES (14, 'https://www.twitch.tv/mdobz', 'hMESztdbJ4XClPu4Q0_pM', 0, '2023-05-20 13:55:23.546968', 4);
INSERT INTO public.links VALUES (15, 'https://www.twitch.tv/mdobz', 'QZ-vyVzzd6JBAtwXOuicj', 1, '2023-05-20 13:55:24.00205', 4);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '0095660b-7217-4935-b989-8d5acb4478eb', '2023-05-19 08:58:58.89485', 5, 1);
INSERT INTO public.sessions VALUES (2, '02bfd996-b686-404b-b582-c75837a1b5a6', '2023-05-19 08:59:03.498989', 5, 2);
INSERT INTO public.sessions VALUES (3, '99a8668a-8fbb-407f-a551-24996a3ee035', '2023-05-19 08:59:05.498315', 5, 3);
INSERT INTO public.sessions VALUES (4, '8fbd5856-a7cf-4cd7-97f8-524daa85ed59', '2023-05-20 10:10:00.181933', 5, 3);
INSERT INTO public.sessions VALUES (5, 'd5122093-c5d5-461c-a41f-9cbb28c7d5e8', '2023-05-20 13:55:02.622112', 5, 4);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Diego', 'diego@driven.com.br', '$2b$10$GpqVuyzpgMmwB4JZCsDHXu7VKZXKpKCYXhftHwdCcG7DA2D0C4bve', '2023-05-19 08:58:35.905566');
INSERT INTO public.users VALUES (2, 'Diego2', 'diego2@driven.com.br', '$2b$10$M4t2Tml4GuTSQFEH94e25Omx/PSIq7gn.9QcV45WMrrYQOYPU6lIy', '2023-05-19 08:58:45.762713');
INSERT INTO public.users VALUES (3, 'Diego23', 'diego23@driven.com.br', '$2b$10$x/CUBkSWfPFKa/il6UOLFO5DYpNgO3cfk8yH4PGBiwgJQM.MNmPr6', '2023-05-19 08:58:51.148938');
INSERT INTO public.users VALUES (4, 'Diego234', 'diego234@driven.com.br', '$2b$10$f.pjNaz5f/vQJv30JNqgaOXYv1VkzCrAHF9pzYuZMXQ4MYGugJGXm', '2023-05-20 13:54:56.703608');


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 15, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

