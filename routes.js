var express = require('express')
var passport = require('passport')
// add
var User = require('./models/user')

var router = express.Router()

/////////////////////////////////
// INITIAL URL
router.get('/', function( request, response ){
	// response.send('success!') // basic
	response.redirect('/survey')
})


//////////////////////////////
// ADMIN PANEL
router.get('/admin', function( request, response ){
	// response.send('success!') // basic

	// get a list of every user and display it, on index.handlebars
	User.find( {}, function( err, data ){
		// response.render('index', { user: request.user, users: data }) // user: is in default.handlebars, users: is in index.handlebars
		// console.log (request)
		console.log(' admin panel accessed ')
		response.render('index', { user: request.user, users: data, uid: request._id, REQ: request, PW: request.password }) // user: is in default.handlebars, users: is in index.handlebars
	})
})

////////////////////////////////
// CREATING A NEW USER
router.get('/register', function( request, response ){
	response.render('register', { house: request.query.house })
})

router.post('/register', function( request, response ){ // matches register.handlebars form info
	
	console.log( request.body.username, request.body.password ) // this is what i just submitted for the new user

	var userData = new User({
		username: request.body.username,
		house: request.body.house,
		money: 300,
		wand: {
			lastSpell: ""
		},
		appearance: {
			gender: request.body.gender
		}
	})

	var password = request.body.password
	User.register( userData, password, function( err, data ){ // this step hashes PW and then saves the user with their PW
		if ( err ) {
			console.log( err )
			return response.render( 'register', { userData: data, err: err } ) // breaks out of function and returns the user data and the error message 
		}

		// if successfully authenticate user, create and save user, start session
		// passport.authenticate('local'), function(req, res){ } ???
		passport.authenticate('local')( request, response, function(){ // taken care of by passportLocalMongoose, this is calling the function within it
			response.redirect('/profile')
		}) 
	})
})

////////////////////////////////
// LOGGING IN AN EXISTING USER
router.get('/login', function( request, response ){
	response.render('login', {user: request.user})
})

// router.post('/login', passport.authenticate('local'), function( req, res ) {
//   res.redirect('/')
// })
router.post('/login', passport.authenticate('local'), function( request, response ){ // checking information in login fields and logging them in

	// console.log("This is the ____ object: ")
	// console.log(request)
	// console.log(" END END REQUEST")
	// console.log("This is the ____ object: ")
	// console.log(response)
	// console.log(" END END RESPONSE")

	User.findById(request.user._id, function ( err, userFound ){
		userFound.wand.lastSpell = "" // reset
		userFound.save() // save changes!
	})

	response.redirect('/profile')
})

// LOGOUT USER, DELETE USER
router.get('/logout', function( request, response ){
	request.logout()
	response.redirect('/')
})

router.post('/logout', function( request, response ){
	// alert("are you SURE you want to delete your account?") // front end?
	User.findById(request.user._id, function ( err, userFound ){
		userFound.remove()
	})
	response.redirect('/')
})

////////////////////////////////
// SURVEY QUESTIONS, SET HOUSE
router.get('/survey', function ( request, response ){
	// response.render('survey', {user: request.user})
	response.render('survey')

})

router.post('/survey', function( request, response ){ // checking information in login fields and logging them in
	var result = whichHouse( request.body )
	response.redirect('/register' + '/?house=' + result)
	
	// User.find( {}, function( err, data ){
	// 	response.render('profile', { user: request.user, users: data, uid: request._id, REQ: request, PW: request.password }) // user: is in default.handlebars, users: is in index.handlebars
	// })

})

	function whichHouse( object ){
		var houseNames = ['thunderbird', 'hornedSerpent', 'pukwudgie', 'wampus']
		var houseWeight = [0, 0, 0, 0]
		for (i=0; i<houseNames.length; i++){
			if ( object.color == houseNames[i] ){
				houseWeight[i] += 1
			}
			if ( object.mascot == houseNames[i] ){
				houseWeight[i] += 1
			}
			if (object.trait == houseNames[i]){
				houseWeight[i] += 1
			}
			if (object.freetime == houseNames[i]){
				houseWeight[i] += 1
			}
			if (object.classes == houseNames[i]){
				houseWeight[i] += 1
			}
		} // close for loop i
		var h = indexOfMax(houseWeight)
		// console.log(houseNames[h])
		return houseNames[h]
	} // close function

	function indexOfMax( array ) {
	    if (array.length === 0) {
	        return -1
	    }
	    var max = array[0]
	    var maxIndex = 0
	    for (var i = 1; i < array.length; i++) {
	        if (array[i] > max) {
	            maxIndex = i
	            max = array[i]
	        }
	    }
	    return maxIndex
	} // this will only return the first instance of the number in the array


////////////////////////////////
// PROFILE
router.get('/profile', function ( request, response ){
	// response.render('survey', {user: request.user})
	var male = false
	if (request.user.appearance.gender == "male"){
		male = true
	}
	var female = false
	if (request.user.appearance.gender == "female"){
		female = true
	}

	var thunderbirdHouse, hornedSerpentHouse, pukwudgieHouse, wampusHouse = false
	if ( request.user.house == 'thunderbird' ){
		thunderbirdHouse = true
	} else if ( request.user.house == 'hornedSerpent' ){
		hornedSerpentHouse = true
	} else if ( request.user.house == 'pukwudgie' ){
		pukwudgieHouse = true
	} else if ( request.user.house == 'wampus' ){
		wampusHouse = true
	}

	response.render('profile', {user: request.user, maleAvatar: male, femaleAvatar: female, thunderbirdHouse: thunderbirdHouse, hornedSerpentHouse: hornedSerpentHouse, pukwudgieHouse: pukwudgieHouse, wampusHouse: wampusHouse})

})


////////////////////////////////
// WAND SHOP
router.get('/wandShop', function( request, response ){
	var enoughMoney = Boolean
	if ( request.user.money >= 150 ){ // handlbars IF can only take true or false statement
		enoughMoney = true
	} else {
		enoughMoney = false
	}
	response.render('wandShop', {user: request.user, enoughMoney: enoughMoney}) // pass true or false
})

router.post('/wandShop', function( request, response ){
	User.findById(request.user._id, function ( err, userFound ){
		userFound.wand = { // add properties to user
			name: request.body.wood,
			cost: 150
		}
		userFound.money = userFound.money - 150 // pay for the money
		userFound.save() // save changes!
	})

	response.redirect('/profile')
})

////////////////////////////////
// PET STORE
router.get('/petStore', function( request, response ){
	var enoughMoney = Boolean
	if ( request.user.money >= 100 ){ // handlbars IF can only take true or false statement
		enoughMoney = true
	} else {
		enoughMoney = false
	}
	response.render('petStore', {user: request.user, enoughMoney: enoughMoney}) // pass true or false
})

router.post('/petStore', function( request, response ){
	User.findById(request.user._id, function ( err, userFound ){
		userFound.pet = { // add properties to user
			name: request.body.petName,
			animal: request.body.petAnimal,
			cost: 100
		}
		userFound.money = userFound.money - 100 // pay for the money
		userFound.save() // save changes!
	})

	response.redirect('/profile')
})

////////////////////////////////
// BATTLE GAME
router.get('/battle', function( request, response ){
	response.render('battle', {user: request.user})
})

router.post('/battle', function( request, response ){
	var spells = ['Aguamente', 'Incendio', 'Deprimo'] 
	var computerNum = Math.floor(Math.random() * 3)
	var userSpell = request.body.spell1

	User.findById(request.user._id, function ( err, userFound ){ 

		if ( spells[computerNum] == userSpell ){
			console.log("it was tie")
			userFound.wand.lastSpell = userSpell 
			userFound.wand.lastResult = "It was a tie... "
		} else if ( spells[computerNum] == "Aguamente" ){
			if ( userSpell == "Incendio") { // LOSS
				console.log ("computer Aguamente beats user Incendio")
				userFound.wand.lastSpell = userSpell 
				userFound.wand.lastResult = "computer Aguamente beats user Incendio. "
			} else if ( userSpell == "Deprimo"){ // WIN
				console.log("computer Aguamente was defeated by user Deprimo")
				userFound.wand.lastSpell = userSpell 
				userFound.wand.lastResult = "computer Aguamente was defeated by user Deprimo. "
				userFound.money = userFound.money + 50 // pay for the money
			} // close inner IF
		} else if ( spells[computerNum] == "Incendio" ){
			if ( userSpell == "Deprimo" ){ // LOSS
				console.log("computer Incendio beats user Deprimo")
				userFound.wand.lastSpell = userSpell 
				userFound.wand.lastResult = "computer Incendio beats user Deprimo. "
			} else if ( userSpell == "Aguamente" ){ // WIN
				console.log("computer Incendio was defeated by user Aguamente")
				userFound.wand.lastSpell = userSpell 
				userFound.wand.lastResult = "computer Incendio was defeated by user Aguamente. "
				userFound.money = userFound.money + 50 // pay for the money
			} // close inner IF
		} else if ( spells[computerNum] == "Deprimo" ){
			if ( userSpell == "Aguamente" ){ // LOSS
				console.log("computer Deprimo beats user Aguamente")
				userFound.wand.lastSpell = userSpell 
				userFound.wand.lastResult = "computer Deprimo beats user Aguamente. "
			} else if ( userSpell == "Incendio"){ // WIN
				console.log("computer Deprimo was defeated by user Incendio")
				userFound.wand.lastSpell = userSpell 
				userFound.wand.lastResult = "computer Deprimo was defeated by user Incendio. "
				userFound.money = userFound.money + 50 // pay for the money
			} // close inner IF
		} // close main IF

		userFound.save() // save changes!
	}) // close findById

	response.redirect('/battle')
}) // close battle POST

////////////////////////////////
// EXPORT
module.exports = router // exports everything within the file (module) so others can use it
// mongod "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"
// RUN basic and see "success!" in browser on localhost:3000

