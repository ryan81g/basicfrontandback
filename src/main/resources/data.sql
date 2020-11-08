-- Need to load in some data that I like for initial display

DROP TABLE if exists notes;

CREATE TABLE notes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY ,
    title VARCHAR(250) NOT NULL,
    description CLOB(10K)
);

-- I like hot sauce, have hundreds of hulk comics, and like to left weights
INSERT INTO notes (title, description) VALUES
    ('Groceries', 'Bread, Milk, Eggs, Butter, Franks Red Hot'),
    ('Hulk Adversaries', 'General Ross, The Leader, Thor, Brian Banner'),
    ('Monday Lifts', 'Chest Press, Dumbbell Flys, and a lot of pushups. Need to add weight this week.');