const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const auth = require("../middleware/auth")
const cookieParser = require('cookie-parser')
const checkToken = require("../middleware/checkToken")
const searchFunction = require("../middleware/searchFunction")

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'




// Login Index
router.get('/', checkToken, (req, res) => {
    try{
    req.app.set('layout', 'layouts/loginLayout')
    res.render('user/login')
  } 
catch {
    res.redirect('/')
  }
    
  })

// Login Route
router.get('/login', (req, res) => {
    try{
    req.app.set('layout', 'layouts/loginLayout')
    res.render('user/login')
  } 
catch {
    res.redirect('/')
  }
    
  })

// Registration Route
router.get('/register', (req, res) => {
    try{
    req.app.set('layout', 'layouts/loginLayout')
    res.render('user/register')
  } 
catch {
    res.redirect('/')
  }
    
  })

// Login Fields
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		
// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)
		res.cookie('authcookie',token, {maxAge:900000,httpOnly:true})
		return res.json({ status: 'ok', data: token})
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

// Registration fields
router.post('/register', async (req, res) => {

    
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

router.get("/home", checkToken, async (req, res) => {

	
	let searchOptions = {}
	console.log(req.query.name)
	console.log("got to router")
	if (req.query.name != null && req.query.name !== '') {
	  searchOptions.name = new RegExp(req.query.name)  
	  const name = searchOptions.name.toString()
	  var result = name.slice(1, -1)
	  console.log(result)}
	  try {
		if (req.query.name != null && req.query.name !== '') {
		const cardData = await searchFunction(result)
		console.log(cardData.data)
		req.app.set('layout', 'layouts/layout')
		res.render('user/home', {
		  cardData: cardData.data,
		  searchOptions: req.query  
		})
  
	  }else{
		req.app.set('layout', 'layouts/layout')
		res.render('user/home', {
		  searchOptions: req.query  
		})
	  }
	} catch (e) {
		console.error(e)
	  res.redirect('/')
	}



})


  module.exports = router