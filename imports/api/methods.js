Meteor.methods({

    'insertTask'(text){
        Tasks.insert({
            text: text,
            createdAt: new Date(), // current time
            userId: Meteor.user()._id,
        });
    },

    'updateTask'(taskId){
        Tasks.update(taskId, {
            $set: { checked: ! this.checked },
        });    
    },

    'deleteTask'(taskId){
        Tasks.remove(taskId);
    },
     
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
    }


});
