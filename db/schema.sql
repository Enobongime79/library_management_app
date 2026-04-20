CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    bio VARCHAR (500)
);

INSERT INTO authors (full_name, bio)
VALUES
('Cal Newport', 'He is a computer science professor at Georgetown University and a bestselling author known for ideas on focus and productivity. His books, including Deep Work and Digital Minimalism, argue that intense, distraction-free concentration is a rare and valuable skill in the modern world.'),
('Robert Martin', 'He is a veteran software engineer and co-author of the Agile Manifesto. Hes best known for promoting clean code principles through books like Clean Code, emphasizing readability, maintainability, and disciplined software craftsmanship.'),
('Andrew Hunt', 'He is a software developer, author, and co-founder of the Agile Alliance. He co-wrote The Pragmatic Programmer, a classic that teaches practical thinking, adaptability, and continuous learning as core habits for effective programmers.');