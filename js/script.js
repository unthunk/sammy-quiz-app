/* Author: Lucas Myers
   This is an example sammy.js application
*/

/*
	define custom sammy.js plugins
*/
var myPlugin = function(app) {
	this.helpers({
		box: function(el) {
			$('.box').hide();
			$(el).show();
		},
		results: function(el, item) {
			$(el).html('');
			var x = "";
			switch(item) {
				case "1" :
					x = "bigmac"; 
					break;
				case "2" :
					x = "davisjr";
					break;
				case "3" :
					x = "sosa";
					break;
				case "4" :
					x = "hagar";
					break;
			}
			var mySammy = myVars.sammy[x];
			this.render('/tpl/my.tpl', {mySammy: mySammy}).appendTo(el);
			this.box(el);
			app.setLocation('#/results');
		}
	});
};

/*
	define the sammy.js application
*/
var app = $.sammy(function() {

	/* include plugins */
	this.use(myPlugin);
	this.use(Sammy.Template, 'tpl');

	/* define selector */
	this.element_selector = '#app';

	/* define routes */
	this.get('#/', function(context) {
    	this.box('#ready');
    });
    this.get('#/quiz', function(context){
    	this.box('#quiz');
    });
    this.get('#/results', function(context){
    	//
    });
    this.post('#/results',function(context){
    	var item = $('[name="sammy-answer"]:checked').attr('value');
    	this.results('#results',item);
    });
});

/*
	document ready scripts
*/
$(function(){
	// instantiate haschange plugin to add hashchange support for older broswers
	$(window).hashchange( function(){
		//
	});

	// start running the sammy.js application
	app.run();
	app.setLocation('#/');

	$("#sammy-quiz").submit(function(e) {
		e.preventDefault();
	});
});

/*
	applciation variables
*/
var myVars = {
	sammy: {
		davisjr: {
			name: 'Sammy Davis Jr',
			img: '/img/sammy-davis-jr.jpg',
			description: 'Samuel George "Sammy" Davis Jr. (December 8, 1925 – May 16, 1990) was an American entertainer and was also known for his impersonations of actors and other celebrities. Primarily a dancer and singer, Davis started as a child vaudevillian who became known for his performances on Broadway and Las Vegas. He went on to become a world famous recording artist, television and film star. Davis was also a member of Frank Sinatra\'s "Rat Pack".'
		},
		sosa: {
			name: 'Sammy Sosa',
			img: '/img/sammy-sosa.jpg',
			description: 'Samuel Peralta "Sammy" Sosa (born November 12, 1968) is a Dominican former professional baseball right fielder. Sosa played with four Major League Baseball teams over his career which spanned from 1989-2007.'
		},
		hagar: {
			name: 'Sammy Hagar',
			img: '/img/sammy-hagar.jpg',
			description: 'Sam Roy "Sammy" Hagar (born October 13, 1947), also known as The Red Rocker, is an American rock singer, guitarist, and songwriter. Hagar came to prominence in the 1970s with the hard rock band Montrose. He afterwards launched a successful solo career, scoring an enduring hit in 1984 with "I Can\'t Drive 55". From 1985 to 1996, and 2003 to 2005, Hagar was the singer for Van Halen. On March 12, 2007, Hagar was inducted into the Rock and Roll Hall of Fame as a member of Van Halen. He has worked with hard rock guitarists such as Eddie Van Halen, Ronnie Montrose, Neal Schon of Journey, and Joe Satriani. Outside of music, he founded the Cabo Wabo Tequila brand and restaurant chain. He currently resides in Mill Valley, California, and also has a residence in Cabo San Lucas, Mexico. His present musical project is as lead singer of Chickenfoot.'
		},
		bigmac: {
			name: 'Big Mac Sammy (Sandwich)',
			img: '/img/big-mac.jpg',
			description: 'Two all beef patties, special sauce, lettuce, cheese, pickles, onions, on a sesame seed bun.'
		}
	}
};