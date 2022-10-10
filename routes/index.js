const express = require('express')
const router = express.Router()
const Book = require('../models/book')

const jwt = require("jsonwebtoken")


router.get('/', async (req, res) => {
  const authcookie = req.cookies.authcookie
  req.app.set('layout', 'layouts/loginLayout')
  if (!authcookie) res.redirect('user/login')
  else{
    try{
      res.redirect('user/home')
    }catch(e){
      console.error(e)
    }
  }


})

module.exports = router