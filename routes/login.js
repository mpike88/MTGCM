const express = require('express')
const router = express.Router()



// Login Index
router.get('/', (req, res) => {
    try{
    req.app.set('layout', 'layouts/loginLayout')
    res.render('login/index')
  } 
catch {
    res.redirect('/')
  }
    
  })


// Registration Route
  router.get('/register', (req, res) => {
    try{
    req.app.set('layout', 'layouts/loginLayout')
    res.render('login/register')
  } 
catch {
    res.redirect('/')
  }
    
  })

  module.exports = router