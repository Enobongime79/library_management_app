var express = require('express');
var router = express.Router();
const pool = require("../db/database");


/* GET home page. */
router.get('/', async (req, res, next) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  try {
    const result = await pool.query('SELECT authors.id, authors.full_name, COUNT(books.id) AS total_books FROM authors LEFT JOIN books ON authors.id = books.author_id GROUP BY authors.id, authors.full_name ORDER BY authors.full_name ASC');
    const data = result.rows;
    console.log(data);
    return res.render("authors", { title: "Library Management System", authors: data})
  } 
  catch (err) {
    console.error(err);
    res.status(500).send("Error fetching books");
  }
});

router.get('/books', async (req, res) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows)
    return res.render("authors", { title: "Books"})

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching books");
  }
});

router.post('/', async (req, res) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  const { fullName } = req.body;
  try {
    const query = `INSERT INTO authors (full_name) VALUES ($1) RETURNING *;`;
    const values = [fullName];
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
    const query = 'SELECT * FROM authors WHERE id = $1';
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
    const query = 'DELETE FROM authors WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    console.log(result.rows);
    res.send(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error deleting book");
  }
})

module.exports = router;
