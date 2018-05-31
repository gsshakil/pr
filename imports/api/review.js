import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


Reviews = new Mongo.Collection('reviews');

if (Meteor.isServer) {

  Meteor.publish('reviews', function () {
    return Reviews.find({});
  });

}

// Review Schema
ReviewSchema = new SimpleSchema({
  userName: {
    type: String
  },
  postId:{
    type: String
  },
  createdAt: {
    type: String
  },
  reviewText: {
    type: String,
    max: 1000
  }

});

Reviews.attachSchema(ReviewSchema);