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