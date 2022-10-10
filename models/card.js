const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  simpleName: {
    type: String,
    required: true
  },
  set: {
    type: String,
    required: true
  },
  cardNumber: {
    type: Number,
    required: true,
  },
  setCode: {
    type: String,
    required: true
  },
  printing: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  rarity: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  sku: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Card', cardSchema)