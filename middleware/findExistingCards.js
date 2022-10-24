const {UserSchema} = require('../models/user')
module.exports = async function(userIdParam){

    try {
      const response = await UserSchema.findOne({_id: userIdParam})
      if ( response != ''){
        
        newCardData = response.cards
        console.log(response.cards[0].image_uris.normal)
        return newCardData
        //myLogger.log(existCardArray)
      }else{
        console.log("empty data")
      }
      } catch (error) {
      console.log(error)
    }
}

















    
  