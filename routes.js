var express = require('express')
var passport = require('passport')
// add
var User = require('./models/user')

var router = express.Router()

router.get('/', function( request, response ){
	// response.send('success!') // basic

	// get a list of every user and display it, on index.handlebars
	User.find( {}, function( err, data ){
		response.render('index', { user: request.user, users: data }) // first users: is referring to which handlebars variable name to use on the index.handlebars file 
		// user: is in layouts.handlebars, users: is in index.handlebars
	})
})

// New users
router.get('/register', function( request, response ){
	response.render('register')
})
router.post('/register', function( request, response ){ // matches register.handlebars form info
	
	console.log( request.body.username, request.body.password )

	var user = new User({
		username: request.body.username
	})

	var password = request.body.password
	User.register( user, password, function( err, data ){ // this step hashes PW and then saves the user with their PW
		if ( err ) {
			console.log( err )
			return response.render( 'register', { user: data, err: err } ) // breaks out of function and returns the user data and the error message 
		}

		// if successfully authenticate user, create and save user, start session
		passport.authenticate('local')( request, response, function(){ // taken care of by passportLocalMongoose, this is calling the function within it
			response.redirect('/')
		}) 
	})
})

router.get('/login', function( request, response ){
	response.render('login', {user: request.user})
	console.log("This is the REQUEST object: ")
	console.log(request)
	console.log(" END END END")
})
// router.post('/login', passport.authenticate('local'), function( req, res ) {

//   res.redirect('/')

// })
router.post('/login', passport.authenticate('local'), function( request, response ){ // checking information in login fields and logging them in
	response.redirect('/')
})

router.get('/logout', function( request, response ){
	request.logout()
	response.redirect('/')
})

module.exports = router // exports everything within the file (module) so others can use it
// mongod "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"
// RUN basic and see "success!" in browser on localhost:3000

