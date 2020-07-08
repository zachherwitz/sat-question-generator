CREATE TABLE questions (id SERIAL PRIMARY KEY, question TEXT, answer1 TEXT, answer2 TEXT, answer3 TEXT, answer4 TEXT, tags TEXT);
INSERT INTO questions (question, answer1, answer2, answer3, answer4, tags) VALUES ('test question', 'a', 'b', 'c', 'd', 'math');
INSERT INTO questions (question, answer1, answer2, answer3, answer4, tags) VALUES ('test question2', 'a', 'b', 'c', 'd', 'reading');
INSERT INTO questions (question, answer1, answer2, answer3, answer4, tags) VALUES ('test question3', 'a', 'b', 'c', 'd', 'history');
