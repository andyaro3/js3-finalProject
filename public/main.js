// // FRONT END
// console.log("connecting \"main.js\" file from Public folder")

$(document).ready(function(){ 
	$("#surveyPage").hide().delay(1500).fadeIn(2000) 

	$("#loginPage").hide().fadeIn(2000) 

	$("#registerPage").hide().fadeIn(2000) 

	// function changeBackground( background ){
	// 	// console.log( background )
	// 	var URL
	//     if( background=="Aguamente" ){
	//         url="/images/spells/aguamente.jpg"
	//    		document.getElementById("spellBattle").style.backgroundImage = "url(" + URL + ")"
	//    		console.log("bg aguamente") 
	//     } else if( background=="Incendio" ){ 
	//     	url="../images/spells/incendio.jpg"
	//     	document.getElementById("spellBattle").style.backgroundImage = "url(" + URL + ")"
	//     	console.log("bg incendio")         
	//     } else if( background=="Deprimo" ){ 
	//     	url="/images/spells/deprimo.jpg"
	//     	document.getElementById("spellBattle").style.backgroundImage = "url(" + URL + ")"
	//     	console.log("bg deprimo")        
	//     }
	// } // style="background-image: url(/images/spells/aguamente.jpg)">
	// $("#spellC").click(changeBackground)
	$("#spellA").click(function(){
		document.getElementById("spellBattle").style.backgroundImage = "url('/images/spells/aguamente.jpg')"
	})

	$("#spellB").click(function(){
		document.getElementById("spellBattle").style.backgroundImage = "url('/images/spells/incendio.jpg')"
	})

	$("#spellC").click(function(){
		document.getElementById("spellBattle").style.backgroundImage = "url('/images/spells/deprimo.jpg')"
	})

	
		
});

// // View
// // var template;
// // $(document).ready(function() {
// //   var templateSource = $('#weather-template').html();
// //   template = Handlebars.compile(templateSource);
// // });

// // function renderWeather() {
// //   var weatherHtml = template(weather);
// //   $('#weather').html(weatherHtml);
// // }

// // Controller
// $(document).ready(function() {
//   // First render
//   // renderWeather();

//   // Setup Listeners
//   $("#newArtistForm").on("submit", function(event) {
//     event.preventDefault();

//     // Model - might need to be outside?
// 	var Artist = ({ // ?????
// 		artist: "", // String
// 		picture: "", // String
// 		spotifyId: "", // String
// 		genres: [], // Array
// 		songs: [] // [request.body.song1, request.body.song2, request.body.song3, request.body.song4] Array
// 	})

// 	console.log( buildURL($('input[name="artist"]').val()) )

// 	if ( $('input[name="artist"]').val() == "" ) {
// 		alert("You must enter an artist or band name into the search to add!")
// 	} else {
// 	    // Make the request to Spotify API
// 	    $.ajax({
// 	      type: "GET",
// 	      url: buildURL($('input[name="artist"]').val()),
// 	      success: function (data) {
// 	      	if ( data.artists.total !== 0 ) {
		        
// 		        // Update the model
// 		        Artist.artist = data.artists.items[0].name;
// 		        Artist.picture = data.artists.items[0].images[0].url;
// 		        Artist.spotifyId = data.artists.items[0].id;
// 		        Artist.genres = data.artists.items[0].genres; 

// 		        // ADD SAVE
// 		        saveArtist(Artist)
// 		        console.log("saved")
// 		        console.log( "URLify: " + urlify( $('input[name="artist"]').val() ) )
// 		  //       $.ajax({
// 				//     dataType: 'json',
// 				//     data: $('#formID').serialize(),
// 				//     type: 'POST',
// 				//     url: "./start",
// 				//     success: handleButtonResponse,
// 				// });
		      
// 		        // testing
// 		        // console.log(Artist) 
// 	    	} else {
// 		        alert("No artist or band by that name or spelling yet... Please try again!")
// 		    } // close IF
	        

// 	        // Rerender the View
// 	        // renderWeather();

// 	      } // close success:
// 	    }) // close $.ajax
// 	} //close IF ELSE

//   }); // close $ #newArtistForm


// $("#newSongForm").on("submit", function(event) {
//     event.preventDefault();

//     // Model 
// 	var Song = ({ // ?????
// 		title: "", // String
// 		artist: "", // String
// 		spotifyID: "", // String
// 		length: 0, // Number
// 		album: "" // [request.body.song1, request.body.song2, request.body.song3, request.body.song4] Array
// 	})

// 	console.log( buildURL2($('input[name="track"]').val()) )

// 	if ( $('input[name="track"]').val() == "" ) { // planning on adding in a "check if artist matches" clause
// 		alert("You must enter a song title into the search to add!")
// 	} else {
// 	    // Make the request to Spotify API
// 	    $.ajax({
// 	      type: "GET",
// 	      url: buildURL2($('input[name="track"]').val()),
// 	      success: function (data) {
// 	      	if ( data.tracks.total !== 0 ) {
		        
// 		        // Update the model
// 		        Song.title = data.tracks.items[0].album.name;
// 		        Song.artist = data.tracks.items[0].artists[0].name;
// 		        Song.spotifyID = data.tracks.items[0].id;
// 		        Song.length = data.tracks.items[0].duration_ms; 
// 		        Song.album = data.tracks.items[0].album.images[0].url;

// 		        // ADD SAVE
// 		        saveSong(Song)
// 		        console.log(Song)
// 		        console.log("saved song")

// 	    	} else {
// 		        alert("No song by that artist or by that name or spelling... Please try again!")
// 		    } // close IF
	        

// 	        // Rerender the View
// 	        // renderWeather();

// 	      } // close success:
// 	    }) // close $.ajax
// 	} //close IF ELSE

//   }); // close $ #newSongForm


// $("#editArtistForm").on("submit", function(event) {
//     event.preventDefault();
//     // console.log($('textarea[name="genres"]').text())
// 	var editArtist = ({ // ?????
// 			uid: $('textarea[name="uid"]').text(),
// 			picture: $('textarea[name="picture"]').text(), // String
// 			genres: [ $('textarea[name="genres"]').text() ], // Array
// 		})

// 	    // Make request to DB
// 	    $.ajax({
// 		    type: "POST",
// 		    url: "/artistEdit",
// 		    data: editArtist, 
// 		    success: function (data) {
// 		    	return data // what do i put here???????????????????????
// 		    } // close success
// 		}); // close ajax

//   }); // close $ #editArtistForm




// }); // close document ready




// // Resourses
// function buildURL(artistName) {
// 	// var aName = artistName.replace(" ", "%20")
// 	var aName = urlify(artistName)
// 	var baseURL = "https://api.spotify.com/v1/search?q="
// 	baseURL += aName
// 	baseURL += "&type=artist"

// 	return baseURL;
// }

// function buildURL2(songName) {
// 	// var sName = songName.replace(" ", "%20")
// 	var sName = urlify(songName)
// 	var baseURL = "https://api.spotify.com/v1/search?q="
// 	baseURL += sName
// 	baseURL += "&type=track"

// 	return baseURL;
// }

// function saveArtist(data) {
// 	$.ajax({
// 	    type: "POST",
// 	    url: "/artists",
// 	    data: data, 
// 	    success: data
// 	});
// }

// function saveSong(data) {
// 	$.ajax({
// 	    type: "POST",
// 	    url: "/songs",
// 	    data: data, 
// 	    success: data
// 	});
// }

// function urlify( artist ) {
//   return encodeURI( artist )
// }