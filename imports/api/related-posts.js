import { Meteor } from 'meteor/meteor';
import './place.js';

// Server
Meteor.publishComposite('similarPosts', function(country, limit) {
    return {
        find: function() {
            // Find posts those are in same country
            return Places.find({ country: country }, { limit: limit });
        },
    }
});