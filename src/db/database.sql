CREATE DATABASE web_chat_postgres;

\connect web_chat_postgres

create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

create TABLE message(
    id SERIAL PRIMARY KEY,
    text VARCHAR(255),
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id)
);

psql \! chcp 1251

DO $$
DECLARE
  i integer;
BEGIN
  FOR i IN 1..3 LOOP
    INSERT INTO person (name) VALUES ('Пользователь ' || i);
  END LOOP;
END $$;

DO $$
DECLARE
  i integer;
  person_id integer;
BEGIN
  FOR i IN 1..150 LOOP
    person_id := (i % 3) + 1;
    INSERT INTO message (text, person_id) VALUES ('Сообщение ' || i, person_id);
  END LOOP;
END $$;