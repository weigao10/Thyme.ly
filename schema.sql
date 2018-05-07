DROP TABLE users;
DROP TABLE activities;
DROP TABLE user_metrics;
DROP TABLE pomodoro_pref;
DROP TABLE errors;

CREATE TABLE users(
  user_id serial NOT NULL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  hash VARCHAR(20),
  pomodoro_id VARCHAR(20),
);

CREATE TABLE activities(
  activity_id serial NOT NULL PRIMARY KEY,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  app_name VARCHAR NOT NULL,
  window_title VARCHAR,
  category VARCHAR,
  prod_class VARCHAR,
  url VARCHAR,
);

CREATE TABLE user_metrics(
  date TIMESTAMP not null,
  prod_number integer,
);

CREATE TABLE pomodoro_pref(
  pom_id integer (10),
  focus_length integer(10),
  break_length integer(10),
  long_break_length integer(10),
  sessions_per_round integer(10),
);

CREATE TABLE errors(
  error_id serial NOT NULL PRIMARY KEY,
  error_message VARCHAR NOT NULL
);

