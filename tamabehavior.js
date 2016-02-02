
var _keystone = require('keystone');

// moods:
// sleeping, normal, bored, dead, happy, heartbroken, sad, ecstatic

module.exports = {
	
	mood: 'normal',
	happiness: 0.5,
	health: 1.0,
	lastInteraction: 0,

	moods: {
		ecstatic: {
			messages: [
				'ecstatic'
			],
			actions: [ 'insult', 'punch' ]
		},
		happy: {
			messages: [
				'happy'
			],
			actions: [ 'tickle', 'insult' ]
		},
		normal: {
			messages: [
				'Errol is feeling pretty normal today!',
				'Look at this freakin ghost! Have you ever seen a more content otherworldly spirit?',
				'Errol\'s like, "sometimes you just gotta chill haha."'
			],
			actions: [ 'tickle', 'punch', 'insult' ]
		},
		sad: {
			messages: [
				'sad'
			],
			actions: [ 'tickle', 'insult' ]
		},
		heartbroken: {
			messages: [
				'heartbroken'
			],
			actions: [ 'tickle', 'punch' ]
		},
		sleeping: {
			messages: [
				'SHHH!!! Errol\'s sleeping. Keep it down silly ;)',
				'Do ghosts dream? Errol\'s investigating!',
				'Nope - that\'s not sleep apnea. This ghost just had a real busy day!'
			],
			actions: [ 'wake' ]
		},
		dead: {
			messages: [
				'Yep that\'s a dead ghost all right.',
				'Even ghosts can die... "boo" hoo, right? lol',
				'Dang the best really do die young.'
			],
			actions: [ 'revive' ]
		},
		bored: {
			messages: [
				'Ugh Errol is so bored.',
				'Add some excitement into Errol\'s boring ghosty life.',
				'So. Bored. Boring. Boredom. Errol come on!!'
			],
			actions: [ 'tickle', 'punch', 'insult' ]
		}
	},

	actions: {
		tickle: function() { this.happiness = Math.min(1.0, this.happiness+0.25); },
		insult: function() { this.happiness = Math.max(0.0, this.happiness-0.25); },
		heal: function() { this.health = Math.min(1.0, this.health+0.25); },
		punch: function() { this.health = Math.max(0.0, this.health-0.25); }
	},

	getMood: function(model) {
		// console.log(model.happiness);
		
		var key = this.mood.id;
		if (key === 'dead') {

		} else {

			var hour = new Date().getHours();
	       	
	       	// Be asleep between 10pm and 9am - wow! Errol sure sleeps a lot :)
	        if (hour > 22 || hour < 9) {
	        	key = 'sleeping';
	        } else {
	        	key = 'normal';

	        	// Get bored after a week of no interactions
	        	// also reset values
	        	if (this.lastInteraction > 0 && Date.now() - this.lastInteraction > 864000000*7) {
	        		this.happiness = 0.5;
	        		this.health = 1.0;
	        		key = 'bored';
	        	}
	        	console.log(this.happiness);
	        	if (this.happiness == 1.0)
	        		key = 'esctatic';
	        	else if (this.happiness >= 0.75)
	        		key = 'happy';
	        	else if (this.happiness <= 0.25)
	        		key = 'sad';
	        	else if (this.happiness == 0)
	        		key = 'heartbroken';
	        }
		}

        var mood = this.moods[key];
        var msg = this.getMessage(mood);

        this.mood = {
        	id: key,
        	message: msg,
        	actions: mood.actions
        };

		return this.mood;
	},

	getMessage: function(mood) {
		return mood.messages[Math.floor(Math.random()*mood.messages.length)];
	},

	doAction: function(action) {
		if (this.happiness == undefined)
			this.happiness = 0.5;
		if (this.health == undefined)
			this.health = 1.0;
		this.lastInteraction = Date.now();
		this.actions[action]();
	}
};