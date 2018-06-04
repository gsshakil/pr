import './jobs.js';

Meteor.methods({
     
    'insertPlace'(insertForm){
        Places.insert(insertForm);
    },

    'updatePlace'(doc, placeId){      
        Places.update({ _id: placeId }, doc);
    },

    'deletePlace'(placeId){
        Places.remove(placeId);
        FlowRouter.go('/places');        
    },

    //Project Review
    'insertReview'(postId, text){
        Reviews.insert({
            userName: Meteor.user().profile.name,
            userProfilePic: Meteor.user().profile.profilePic,
            postId: postId,
            createdAt: new Date(),
            reviewText: text
        }, (err)=>{
            if (err){
                console.log(err);
            } else {
                toastr.success('Review Added Succesfully!');  
            }
        });
    },

    'deleteReview'(id){
        Reviews.remove(id);        
    },

    //Jobs
    'insertJob'(insertForm){
        Jobs.insert(insertForm);
    },

    'updateJob'(doc, jobId){      
        Jobs.update({ _id: jobId }, doc);
    },

    'deleteJob'(jobId){
        Jobs.remove(jobId);
        FlowRouter.go('/jobs');        
    },
});
