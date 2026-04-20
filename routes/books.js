var express = require('express');
var router = express.Router();
const pool = require("../db/database");


/* GET home page. */
router.get('/', async (req, res, next) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY author ASC');
    const authors = await pool.query('SELECT full_name, id FROM authors')
    const authorRow = authors.rows;
    const data = result.rows;
    console.log(data);
    console.log(authorRow);
    return res.render("books", { title: "Library Management System", books: data, authors: authorRow})
  } 
  catch (err) {
    console.error(err);
    res.status(500).send("Error fetching books");
  }
});

router.post('/', async (req, res) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  const { title, author_id, genre, year, copies } = req.body;
  try {
    const findName = await pool.query('SELECT full_name FROM authors WHERE id = $1', [author_id])
    const authorName = findName.rows[0].full_name;
    
    const query = `INSERT INTO books (title, author_id, author, genre, year_published, availability) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const values = [title, author_id, authorName, genre, year, copies];
    const result = await pool.query(query, values);

    res.send(result);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error inserting books");
  }
})

router.get('/:id', async (req, res) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await pool.query(query, [id]);
    console.log(result.rows);
    res.send(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error fetching book");
  }
})

router.delete('/:id', async (req, res) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  const { id } = req.params;
  try {
    const query = 'DELETE FROM books WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    console.log(result.rows);
    res.send(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error deleting book");
  }
})

router.put('/:id', async (req, res) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  const { id } = req.params;
  const { title, author, genre, year, copies } = req.body;
  try {
    const query = `UPDATE books SET title = $1, author = $2, genre = $3, year_published = $4, availability = $5 WHERE id = $6 RETURNING *;`;
    const values = [title, author, genre, year, copies, id];
    const result = await pool.query(query, values);
    
    res.send(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error updating book");
  }
})

module.exports = router;
