if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: ".env" })
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const loginRouter = require('./routes/login')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout','layouts/loginLayout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')

async function connect () {
  try{
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true })
    console.log("connected to Mongo DB")
  } catch (error) {
      console.error(error)
  }
}

connect()
//const mongoose = require('mongoose')
//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//const db = mongoose.connection
//db.on('error', error => console.error(error))
//db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
app.use('/login', loginRouter)

app.listen(process.env.PORT || 3000)