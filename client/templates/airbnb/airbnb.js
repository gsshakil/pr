import '../../../imports/api/place.js';
import '../../../imports/api/images.js';

import { FilesCollection } from 'meteor/ostrio:files';


//Update Form
Template.updatePlaceForm.helpers({
  placesDoc(){
      Meteor.subscribe('places.detail');
      id = FlowRouter.getParam("_id");
      return Places.findOne({_id: id}); 
  }
});

// Delete List
Template.Place_detail.events({
  'click .btn-remove'(){
      placeId = FlowRouter.getParam("_id");
      if(confirm("Do you really want to delete this post?")){
        Meteor.call('deletePlace', placeId);  
        toastr.success('Listing Deleted Succesfully!');                    
      };
  }
});

// Display List
Template.Airbnb_list.helpers({
    places(){
        Meteor.subscribe('places'); 
        return Places.find({},  { sort: { createdAt: -1 }});          
    }
});

Template.Airbnb_list_topbar.helpers({
    noOfPlaces(){
        return Places.find({}).count();                  
    },
});

Template.Place_detail.helpers({

    places(){
        Meteor.subscribe('places.detail');
        id = FlowRouter.getParam("_id");
        return Places.findOne({_id: id});                    
    },

    host(){
        Meteor.subscribe('places.detail');
        Meteor.subscribe('users');        
        var id = FlowRouter.getParam("_id");
        var place =  Places.findOne({_id: id});
        var uId = place.userId;
        return Meteor.users.findOne({_id: uId }).profile;
    },

    images(){
        Meteor.subscribe('images');
        return Images.find({});                            
    }
});



Template.User_thumbnail.helpers({
    userProfile(){
      return Meteor.user();
    }  
});

Template.Similar_listing.helpers({
    'similarPosts'(){
        var id = FlowRouter.getParam("_id");
        var place =  Places.findOne({_id: id});
        var country = place.country, 
        limit = 10;
        Meteor.subscribe('similarPosts', country, limit);
        return Places.find({ country: country }, { limit: limit });
    }
});


Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('places');  
});


// Autoform Hooks
AutoForm.addHooks('insertPlaceForm',{
    onSuccess(formType, result) {
      FlowRouter.go('/places/');
      toastr.success('Listing Submitted Succesfully!');      
    }
});

AutoForm.addHooks('updatePlaceForm',{
    onSuccess(formType, result) {
      FlowRouter.go('/places/' + this.docId);
      toastr.success('Listing Updated Succesfully!');                   
    }
});
