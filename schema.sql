DROP TABLE users;
DROP TABLE activities;
DROP TABLE user_metrics;
DROP TABLE pomodoro_pref;
DROP TABLE errors;

CREATE TABLE users(
  user_id serial PRIMARY KEY,
  username VARCHAR (20),
  hash VARCHAR (20),
  pom_id VARCHAR (20),
);

CREATE TABLE activities(
  activity_id serial PRIMARY KEY,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  app_name VARCHAR(25),
  window_title VARCHAR(50),
  category VARCHAR(25),
  prod_class VARCHAR(25),
  url VARCHAR (100),
);

CREATE TABLE user_metrics(
  date TIMESTAMP not null,
  prod_number integer (3),
);

CREATE TABLE pomodoro_pref(
  pom_id integer (10),
  focus_length integer(10),
  break_length integer(10),
  long_break_length integer(10),
  sessions_per_round integer(10),
);

CREATE TABLE errors(
  error_id serial,
  error_message VARCHAR(255)
);

