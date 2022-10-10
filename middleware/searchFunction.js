
module.exports = async function(searchParam){
    const axios = require('axios');
    
    try {
      const response = await axios.get(`https://api.scryfall.com/cards/search`,{params: { q: searchParam,order: "name"}})
      return response.data
      } catch (error) {
      console.log(error)
    }
}














