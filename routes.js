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
		money: 300
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

	response.redirect('/profile')
})

// LOGOUT USER
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
	response.render('profile', {user: request.user})

})


////////////////////////////////
// EXPORT
module.exports = router // exports everything within the file (module) so others can use it
// mongod "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"
// RUN basic and see "success!" in browser on localhost:3000

