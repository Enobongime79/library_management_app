var express = require('express');
var router = express.Router();
const pool = require("../db/database");


/* GET home page. */
router.get('/', async (req, res, next) => {
  if (!req.session.email){
    return res.redirect("/")
  }
  try {
    const result = await pool.query('SELECT * FROM borrow_records ORDER BY borrower ASC');
    const data = result.rows;
    const books = await pool.query('SELECT title FROM books');
    const bookTitles = books.rows;
    console.log(data);
    console.log(bookTitles);
    return res.render("borrow", { title: "Library Management System", borrows: data, books: bookTitles})
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
  const { book, borrowerName, borrowDate, dueDate } = req.body;
  try {
    const book_id = await pool.query('SELECT id FROM books WHERE title = $1', [book]);
    const book_id_value = book_id.rows[0].id;
    
    const query = `INSERT INTO borrow_records (book_title, book_id, borrower, borrow_date, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const values = [book, book_id_value, borrowerName, borrowDate, dueDate];
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
    const query = 'SELECT * FROM borrow_records WHERE id = $1';
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
    const query = 'DELETE FROM borrow_records WHERE id = $1 RETURNING *;';
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
