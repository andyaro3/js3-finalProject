var express = require('express')
var hbs = require('express-handlebars')
var mongoose = require('mongoose')
// RUN mongod in CMD:  "C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"

// Apps to intregrate passport 
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var routes = require('./routes') // all Routes!
var app = express()

// Configuration
app.engine('handlebars', hbs({defaultLayout: 'default'}))
app.set('view engine', 'handlebars')

app.use( bodyParser.urlencoded( { extended: false } ))
app.use( bodyParser.json() )
app.use( cookieParser() )

// Passport relies on a session, creating session
app.use( require('express-session') ({
	secret: 'harryplopper',
	resave: false, // dont resave within a session
	saveUninitialized: false // dont save anything not initialized
}))

// Starting Passport
app.use( passport.initialize() )
app.use( passport.session() )

// Get the model and have the local strategy authenticate the new user
var User = require('./models/user')
passport.use( new LocalStrategy( User.authenticate() )) // this creates the strategy and then sets it up within passport
passport.serializeUser( User.serializeUser() ) // each is coming from different apps to work together to accomplish the task, hence serializeUser() being called twice
passport.deserializeUser( User.deserializeUser() )
// initial setup done

// app.use(require('express-session')({ // duplicate?
//   secret: 'magical unicorns are awesome',
//   resave: false,
//   saveUninitialized: false
// }))

// mongoose
mongoose.connect('mongodb://localhost:27017/hp')

//Routes
app.use( routes )

// app.get('/', function( req, res ) { // not needed anymore - now in routes.js file
//   res.send( 'success' )
// })

app.use(function( request, response, next ) {

  var err = new Error('Not Found')
  err.status = 404
  next( err )

})


app.listen(3000, function(){
	console.log("hp final project up and running...")
})
