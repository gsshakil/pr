import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { FilesCollection } from 'meteor/ostrio:files';
import './images.js';
import './methods.js';

Places = new Mongo.Collection("places");

Places.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
});

Places.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = Date.now();
});


if (Meteor.isServer) {

  Meteor.publish('places', function () {
    return Places.find({});
  });

  Meteor.publish('places.detail', function (id) {
    id = FlowRouter.getParam("_id");
    return Places.findOne({ "_id": id});
  });

  Meteor.publish("users", function () {
    return Meteor.users.find();
  });

}


// DescriptionSchema
DescriptionSchema = new SimpleSchema({
  userId: {
    type: String,
    autoValue:function(){ return Meteor.user()._id }
  },
  placeName: {
    type: String,
    label: "Enter Project Title",
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




// AttachmentSchema
AttachmentSchema = new SimpleSchema({

  pictures: {
    type: Array,
    label: 'Choose file'
  },
  'pictures.$': {
    type: Object,
  },
  'pictures.$.filename': {
    type: String,    
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    }
  }
});



Places.attachSchema(DescriptionSchema);
// Places.attachSchema(BasicInfoSchema);
// Places.attachSchema(LocationSchema);
Places.attachSchema(AttachmentSchema);




