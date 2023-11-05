CREATE TABLE users(
    id bigserial primary key, 
    name varchar(200) not null,
    email varchar(200) not null,
    password varchar(200) not null,
    unique(email)
);