var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const pool = require("../db/database");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page', error: null });
});

router.post('/', async function(req, res, next) {
  const { email, password } = req.body;
  
  try {
    const checkEmail = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (checkEmail.rows.length === 0) {
      return res.render("login", { error: "Invalid email or password", title: 'Login Page' })
    }
    const user = checkEmail.rows[0];
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password", title: 'Login Page' })
    }
    req.session.email = email;
    return res.redirect('/borrow');
  }
  catch (err){
    console.error(err);
    return res.status(500).send("Server error"); 
  }
});

module.exports = router;
