const {UserSchema} = require('../models/user')
module.exports = async function(userIdParam,cardUriParam,cardQuantParam){

    try {
      await UserSchema.findOneAndUpdate({ _id: userIdParam, "cards.scryfall_uri": cardUriParam },{ $inc: {"cards.$.collector_info.quantity": cardQuantParam}})
      } catch (error) {
      console.log(error)
    }
}



