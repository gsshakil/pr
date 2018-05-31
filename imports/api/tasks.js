import { Mongo } from 'meteor/mongo';
 
Tasks = new Mongo.Collection('tasks');


if (Meteor.isServer) {

    Meteor.publish('tasks', function () {
        return Tasks.find({});
    });
  
}


