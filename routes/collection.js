const express = require('express')
const router = express.Router()
const checkToken = require("../middleware/checkToken")
const {UpdatedCardSchema, UserSchema} = require('../models/user')
const {ScryCardSchema} = require('../models/scry')
const csv = require('csvtojson')
const multer = require('multer')
const findExistingCards = require("../middleware/findExistingCards")
const updateQuantity = require("../middleware/updateQuantity")
const cardMatchAndAppend = require("../middleware/cardMatchAndAppend")


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
var uploads = multer({ storage: storage })



const { Console } = require("console");
// get fs module for creating write streams
const fs = require("fs");

// make a new logger
const myLogger = new Console({
  stdout: fs.createWriteStream("normalStdout.txt"),
  stderr: fs.createWriteStream("errStdErr.txt"),
});

// saving to normalStdout.txt file
//myLogger.log("Hello 😃. This will be saved in normalStdout.txt file");

// saving to errStdErr.txt file
//myLogger.error("Its an error ❌. This will be saved in errStdErr.txt file");






// Collection Index
router.get('/', checkToken, async(req, res) => {
    try{
      var userId = req.user
      const cardData = await findExistingCards(userId)
      //myLogger.log(cardData)
    req.app.set('layout', 'layouts/collectionLayout') 
    res.render('user/collection/myCollection', {
		  cardData: cardData  
		})
  } 
catch (e){
console.log(e)
    res.redirect('/')
  }
    
  })
// Collection Upload
router.get('/upload', checkToken, (req, res) => {
    try{
    req.app.set('layout', 'layouts/loginLayout')
    UpdatedCardSchema.find((err, data) => {
        if (err) {
        } else {
          if (data != '') {
            res.render('user/collection/upload', { data: data })
          } else {
            res.render('user/collection/upload', { data: '' })
          }
        }
      })  
  } 
catch {
    res.redirect('/')
  }
    
  })

  
  router.post('/upload', checkToken, uploads.single('csvFile'), (req, res) => {
    var cardResponse
    var userId = req.user
    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        
        for (var x = 0; x < response; x++) {
          cardResponse = parseFloat(response[x].quantity)
          response[x].quantity = cardResponse
          cardResponse = parseFloat(response[x].name)
          response[x].name = cardResponse
          cardResponse = parseFloat(response[x].simpleName)
          response[x].simpleName = cardResponse
          cardResponse = parseFloat(response[x].set)
          response[x].set = cardResponse
          cardResponse = parseFloat(response[x].cardNumber)
          response[x].cardNumber = cardResponse
          cardResponse = parseFloat(response[x].setCode)
          response[x].setCode = cardResponse
          cardResponse = parseFloat(response[x].printing)
          response[x].printing = cardResponse
          cardResponse = parseFloat(response[x].condition)
          response[x].condition = cardResponse
          cardResponse = parseFloat(response[x].language)
          response[x].language = cardResponse
          cardResponse = parseFloat(response[x].rarity)
          response[x].rarity = cardResponse
          cardResponse = parseFloat(response[x].productId)
          response[x].productId = cardResponse
          cardResponse = parseFloat(response[x].sku)
          response[x].sku = cardResponse
        }
        //myLogger.log(response)
        try{
          var existCardArray = await findExistingCards(userId)
            console.log("Got existing Cards")

          
        }catch(e){
          console.error(e)
        }
        
        var searchArray = []
        
        //console.log(response[5].name)
        //console.log(response[5].quantity)

        /*await UserSchema.findOne({_id: userId}, (err, data) =>{
          if (err){
            console.error(err)
          }else{
            if ( data != ''){
              jsonData = data.toJSON()
              existCardArray = jsonData.cards
              //myLogger.log(existCardArray)
            }else{
              console.log("empty data")
            }
          }
        })*/

        
        for(var s = 0; s < response.length; s++){
          let element = response[s]
          let langInput = element.language.toLowerCase()
          let setCase = element.setCode.toLowerCase()
          let langOutput = langInput.slice(0,-5) 
          let collNum = element.cardNumber
          let collQuan = element.quantity
          let collPrint = element.printing
          let collCon = element.condition
          try{
            let newData = await cardMatchAndAppend(setCase,langOutput,collNum,collQuan,collPrint,collCon)
              myLogger.log(newData.name)
              myLogger.log(newData.collector_info.quantity)
              searchArray.push(newData)
  
            
          }catch(e){
            console.error(e)
          }

          

          //myLogger.log(newData.name)
          //myLogger.log(newData.collector_info.quantity)
          //searchArray.push(newData)

          console.log(s)
          /*try{
            await ScryCardSchema.findOne({ set: setCase, lang: langOutput, collector_number: collNum},(err, data) => {
              if (data != '') {
                
                //console.log(s)
                jsonData = data.toJSON()
                
                var collector_info = {
                  'collector_info': {
                    'quantity': element.quantity,
                    'printing': element.printing,
                    'condition': element.condition,
                  }
                }
                
                //data.collector_info = collector_info
                newData = {...jsonData, ...collector_info}
                //myLogger.log(s)
                //myLogger.log(newData.name)
                
                
                //myLogger.log(searchArray)
              } else {
                console.log("no poop")
              }
            }
          )

          }catch(e){
            console.error(e)
          }*/
  
        }
        //myLogger.log(searchArray)
      let existUriArray = []

      for(var d = 0; d < existCardArray.length; d++){

        const scryfallUri = existCardArray[d].scryfall_uri
        existUriArray.push(scryfallUri)
      }



      for(var f = 0; f < searchArray.length; f++){
       var cardUri = searchArray[f].scryfall_uri
       var cardQuant = searchArray[f].collector_info.quantity
        if(existUriArray.includes(cardUri)){
         
          try{
            await updateQuantity(userId,cardUri,cardQuant)
            console.log("Updated Quantity")  
          }catch(e){
            console.error(e)
          }
         
         searchArray.splice(f, 1)
         f--
          /*try {
            let data = await UserSchema.findOneAndUpdate({ _id: userId, "cards.scryfall_uri": cardUri },{ $inc: {"cards.$.collector_info.quantity": searchArray[f].collector_info.quantity}})
            if(!data) {
              throw new Error('no document found')
            }
            //console.log(searchArray[f].name)
            //myLogger.log(data)
            
            //console.log("attempted to Splice")
            for(var i = 0; i < searchArray.length; i++){
              myLogger.log(searchArray[i].name)
            } */ 
        }}


      
      //myLogger.log(searchArray)
      //console.log(existUriArray)
      //myLogger.log(searchArray)
      //console.log(searchArray[1].scryfall_uri)

        

        //const intersection = existUriArray.filter(element => searchUriArray.includes(element));

      
        console.log("Got to Update")
        //console.log(searchArray)
        UserSchema.updateOne({ _id: userId },{$push: {cards: {$each: searchArray}}},{upsert:true},function(err){
          if(err){
                  console.log(err);
          }else{
                  console.log("Successfully added");
          }
  })
      })
      
      res.redirect('/user/collection')
      
  })

module.exports = router