var mongoose = require('mongoose')
var Schema = mongoose.Schema

var passportLocalMongoose = require('passport-local-mongoose')

// added a lot of potential features so I don't have to keep changing the model
var User = new Schema({
	username: String, 
	password: String, // need to hash/encrypt PW
	createdAt: {
		type: Date, 
		default: Date.now
	}, 
	house: Array, // order of their answers
	money: Number, // start with 300
	appearance: { // make own model?
		name: String, // maybe just use username
		gender: String, 
		race: String, 
		hairColor: String, 
		hairStyle: String, 
		eyeColor: String, 
		eyeShape: String, 
		height: Number, // inches
		glasses: Boolean, 
		robeStyle: String, 
		robeColor: String, 
		scarfStyle: String, 
		scarfStyle: String
	},
	wand: { // make own model?
		name: String, 
		wood: String, 
		core: String, 
		strength: Number, // 1-10 powerful
		speed: Number, // 1-10 fast
		skill: Number, // 1-10 more complicated spells?
		cost: Number, 
		lastSpell: String, 
		lastResult: String, 
	}, 
	pet: { // make own model?
		name: String, 
		animal: String, 
		size: String, 
		cost: Number
	}, 
	patronus: String
})

User.plugin( passportLocalMongoose )

module.exports = mongoose.model( 'User', User ) // 'Wizard' is referencing the var model above, and User is for being called externally
