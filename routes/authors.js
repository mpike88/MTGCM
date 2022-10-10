const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')
const authors =  Author.find()
const auth = require('../middleware/auth')



async function searchFunction(searchParam) {
  const axios = require('axios');
  
  try {
    const response = await axios.get(`https://api.scryfall.com/cards/search`,{params: { q: searchParam,order: "name"}})
    return response.data

    } catch (error) {
    console.log(error)
  }
}


/*router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})
*/

// All Route
router.get('/', async (req, res) => {


})

      //let parsedData = JSON.parse(data)
 //     let searchResponse = []
      //console.log(data.data)
    //if(typeof(data.data) === "string"){data.data = JSON.parse(data)}
 //data.data.forEach(function(card){
 //       searchResponse.push({
 //        name: card.name,
 //        image_uri: card.image_uris.large
 //     })
 //       }) 
 //     console.log(searchResponse)    
            
      

      
     
      



// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})

// Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })
  try {
    const newAuthor = await author.save()
    res.redirect(`authors/${newAuthor.id}`)
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({ author: author.id }).limit(6).exec()
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch {
    res.redirect('/')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render('authors/edit', { author: author })
  } catch {
    res.redirect('/authors')
  }
})

router.put('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    author.name = req.body.name
    await author.save()
    res.redirect(`/authors/${author.id}`)
  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    }
  }
})

router.delete('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    await author.remove()
    res.redirect('/authors')
  } catch {
    if (author == null) {
      res.redirect('/')
    } else {
      res.redirect(`/authors/${author.id}`)
    }
  }
})

module.exports = router