//find all card objects that exist for user

// compare cards from excel array to cards from user card array (existing cards)

// if scryfall uri matches in the first array against the second array flag as duplcate entry. 

// grab object of each duplicate card from the existing card array

// grab the quantity of each duplicate card from the new card array

// update the quantity for each Object that was a duplcate by the quantity in the new card array. 

// if the card was not a duplcate that array of non-duplicates is pushed as an update to the user's card table. 


<% for(let count = 0; count < cardData.length; count++ ){ %>
    <br><%= console.log(cardData[count],count) %>
      <%#  will output the numbers 1-100 %>
  <% } %>