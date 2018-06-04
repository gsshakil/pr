import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import './methods.js';

Jobs = new Mongo.Collection("jobs");

Jobs.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
});

Jobs.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = Date.now();
});


if (Meteor.isServer) {

  Meteor.publish('jobs', function () {
    return Jobs.find({});
  });

  Meteor.publish('jobs.detail', function (id) {
    id = FlowRouter.getParam("_id");
    return Jobs.findOne({ "_id": id});
  });

}


// JobsSchema
JobsSchema = new SimpleSchema({
  userId: {
    type: String,
    autoValue:function(){ return Meteor.user()._id }
  },
  jobRole: {
    type: String,
    label: "Enter Job Role",
    max: 1000
  },
  companyName: {
    type: String,
    label: "Enter Company Name",
    max: 1000
  },
  jobLocation: {
    type: String,
    label: "Enter Job Location",
    max: 1000
  },
  description: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 6
      }
    }
  }
});

Jobs.attachSchema(JobsSchema);




