import { Template } from 'meteor/templating';

import '../../../imports/api/review.js';
import '../../../imports/api/methods.js';


Template.Reviews.helpers({

    reviews(){
        Meteor.subscribe('reviews'); 
        var postId = FlowRouter.getParam("_id");                 
        return Reviews.find({postId: postId});
    },

    reviewCount(){
        Meteor.subscribe('reviews'); 
        var postId = FlowRouter.getParam("_id");                     
        return Reviews.find({postId: postId}).count();
    },

    userProfile(){
      return Meteor.user().profile;
    },
});

Template.Reviews.events({
    'click .btn-delete'(){
        Meteor.call('deleteReview', this._id);
        toastr.success('Review Deleted Succesfully!');
        return false;          
    }
});

Template.Add_reivew.events({

    'submit .add-review'(e){                            

        e.preventDefault();

        postId = FlowRouter.getParam("_id");

        const reviewText = e.target.reviewText.value;
        const userId = Meteor.user()._id;

        console.log(postId, reviewText, userId);

        Meteor.call('insertReview', postId, reviewText);
        e.target.reviewText.value="";

        return false;
    }

});
