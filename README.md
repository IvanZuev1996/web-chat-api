> ## **Frontend**

**GitHub клиентской части приложения - [APP](https://github.com/IvanZuev1996/web-chat-app.git)**

> ## **Запуск проекта**

```
npm install - устанавка необходимых зависимостей
npm start - запуск в dev режиме
```

> ## **База данных**

В качестве базы данных использовалась PostgreSQL.

**Существующая БД**

Для работы с уже существующей базой данных достаточно просто запустить сервер (см. пункт "Запуск проекта").

**Создание новой БД**

Для создания новой базы данных на вашем компьютере необходимо использовать скрипты из файла [`src/db/database.sql`](/src/db/database.sql).

-   `1. Создание базы данных`

```SQL
CREATE DATABASE web_chat_postgres;
\connect web_chat_postgres
```

-   `2. Создание таблиц`

```SQL
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
```

-   `3. Создание тестовых пользователей и сообщений (опционально)`

```SQL
-- Создание пользователей
DO $$
DECLARE
  i integer;
BEGIN
  FOR i IN 1..3 LOOP
    INSERT INTO person (name) VALUES ('Пользователь ' || i);
  END LOOP;
END $$;

-- Создание сообщений
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
```

После чего необходимо внести изменения в [db.ts](/src/db/db.ts)

```Ts
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL + '?sslmode=require'
// });

const pool = new Pool({
    user: 'your_username',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
    database: 'web_chat_postgres'
});
```
