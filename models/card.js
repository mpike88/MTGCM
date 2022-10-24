const mongoose = require('mongoose')

const CollectorInfoSchema = new mongoose.Schema({
	quantity: { type: Number, required: false },
	printing: { type: String, required: false },
	condition: { type: String, required: false, }
  })

const ImageuriSchema = new mongoose.Schema({
	small: { type: String, required: false },
	normal: { type: String, required: false },
	large: { type: String, required: false },
	png: { type: String, required: false },
	art_crop: { type: String, required: false },
	border_crop: { type: String, required: false }
	})

const ColorSchema = new mongoose.Schema({
	0: { type: String, required: false },
	1: { type: String, required: false },
	2: { type: String, required: false },
	3: { type: String, required: false },
	4: { type: String, required: false },

	})
const ArraySchema = new mongoose.Schema({
	0: { type: String, required: false },
	1: { type: String, required: false },
	2: { type: String, required: false },
	3: { type: String, required: false },
	4: { type: String, required: false },
	5: { type: String, required: false },

	})
const LegalitiesSchema = new mongoose.Schema({

	standard: { type: String, required: false },
	future: { type: String, required: false },
	historic: { type: String, required: false },
	gladiator: { type: String, required: false },
	pioneer: { type: String, required: false },
	explorer: { type: String, required: false },
	modern: { type: String, required: false },
	legacy: { type: String, required: false },
	pauper: { type: String, required: false },
	vintage: { type: String, required: false },
	penny: { type: String, required: false },
	commander: { type: String, required: false },
	brawl: { type: String, required: false },
	historicbrawl: { type: String, required: false },
	alchemy: { type: String, required: false },
	paupercommander: { type: String, required: false },
	duel: { type: String, required: false },
	oldschool: { type: String, required: false },
	premodern: { type: String, required: false }
	})
const PricesSchema = new mongoose.Schema({
	usd: {},
	usd_foil: {},
	usd_etched: {},
	eur: {},
	eur_foil: {},
	tix: {}

	})

const RelatedUriSchema = new mongoose.Schema({
	gatherer: { type: String, required: false },
	tcgplayer_infinite_articles: { type: String, required: false },
	tcgplayer_infinite_decks: { type: String, required: false },
	edhrec: { type: String, required: false }
	})	




const UpdatedCardSchema = new mongoose.Schema({
object: { type: String, required: false },
id: { type: Number, required: false },
oracle_id: { type: String, required: false },
multiverse_ids: { type: Array, required: false },
mtgo_id: { type: Number, required: false },
mtgo_foil_id: { type: Number, required: false },
tcgplayer_id: { type: Number, required: false },
cardmarket_id: { type: Number, required: false },
name: { type: String, required: false },
lang: { type: String, required: false },
released_at: { type: Date, required: false },
uri: { type: String, required: false },
scryfall_uri: { type: String, required: false },
layout: { type: String, required: false },
highres_image: { type: Boolean, required: false },
image_status: { type: String, required: false },
image_uris: {
	type: ImageuriSchema,
	required: false
},
mana_cost: { type: String, required: false },
cmc: { type: Number, required: false },
type_line: { type: String, required: false },
oracle_text: { type: String, required: false },
power: { type: Number, required: false },
toughness: { type: Number, required: false },
colors: [ColorSchema],
color_identity: [ColorSchema],
keywords: [ArraySchema],
collector_info: [CollectorInfoSchema],
legalities: {
	type: LegalitiesSchema,
	required: false
},
games: [ArraySchema],
finishes: [ArraySchema],
oversized: { type: Boolean, required: false },
promo: { type: Boolean, required: false },
reprint: { type: Boolean, required: false },
variation: { type: Boolean, required: false },
set_id: { type: String, required: false },
set: { type: String, required: false },
set_name: { type: String, required: false },
set_type: { type: String, required: false },
set_uri: { type: String, required: false },
set_search_uri: { type: String, required: false },
scryfall_set_uri: { type: String, required: false },
rulings_uri: { type: String, required: false },
prints_search_uri: { type: String, required: false },
collector_number: { type: String, required: false },
digital: { type: Boolean, required: false },
rarity: { type: String, required: false },
flavor_text: { type: String, required: false },
card_back_id: { type: String, required: false },
artist: { type: String, required: false },
artist_ids: [ArraySchema],
illustration_id: { type: String, required: false },
border_color: { type: String, required: false },
frame: { type: String, required: false },
full_art: { type: Boolean, required: false },
textless: { type: Boolean, required: false },
booster: { type: Boolean, required: false },
story_spotlight: { type: Boolean, required: false },
edhrec_rank: { type: Number, required: false },
prices: {
	type: PricesSchema,
	required: false
},
related_uris: {
	type: RelatedUriSchema,
	required: false
}
},
{ collection: 'cards' }
)

module.exports = {
	UpdatedCardSchema: mongoose.model('UpdatedCardSchema', UpdatedCardSchema)
  };