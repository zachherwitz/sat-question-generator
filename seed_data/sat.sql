drop table if exists questions; 

CREATE TABLE questions
(
  id SERIAL PRIMARY KEY,
  question TEXT,
  answer1 TEXT,
  answer2 TEXT,
  answer3 TEXT,
  answer4 TEXT,
  tags TEXT,
  correctanswer TEXT
);