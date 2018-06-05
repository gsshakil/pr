Template.Edit_profile.helpers({
    profile(){
        Meteor.subscribe('users');        
        return Meteor.users.findOne({_id: Meteor.user()._id}).profile;  
    }
});

Template.People_card.helpers({
    profile(){
        Meteor.subscribe('users');        
        return Meteor.users.findOne({_id: this._id}).profile;  
    }
});

Template.People_list.helpers({
    people(){
        Meteor.subscribe('users');
        return Meteor.users.find({},  { sort: { createdAt: -1 }});
    }
});


Template.User_details.helpers({
    project(){
        Meteor.subscribe('places');
        id = FlowRouter.getParam("_id");                 
        return Places.find({userId: id},  { sort: { createdAt: -1 }});          
    },
    profile(){
        Meteor.subscribe('users');
        id = FlowRouter.getParam("_id");        
        return Meteor.users.findOne({_id: id}).profile;  
    }
}); 

Template.Project_card.helpers({
    project(){
        Meteor.subscribe('places'); 
        return Places.find({},  { sort: { createdAt: -1 }});          
    }
}); 

Template.Edit_profile.events({
    'submit .update-profile'(e){
        e.preventDefault();

        var name = e.target.name.value;
        var designation = e.target.designation.value;
        var location = e.target.location.value;

        Meteor.users.update({
            _id:Meteor.user()._id}, 
            { $set: {
                profile: {
                    name: name,
                    designation: designation,
                    location: location,                 
                }
            }
        }, function(err){
            if (err){
                console.log(err);
            } else {
                toastr.success('Profile Updated Succesfully!');                      
            }
        });

        return false;
    }   
});