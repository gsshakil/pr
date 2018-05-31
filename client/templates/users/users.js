Template.Edit_profile.helpers({
    profile(){
        Meteor.subscribe('users');        
        return Meteor.users.findOne({_id: Meteor.user()._id}).profile;  
    }
});

Template.Edit_profile.events({
    'submit .update-profile'(e){
        e.preventDefault();

        var name = e.target.name.value;
        var about = e.target.about.value;

        Meteor.users.update({
            _id:Meteor.user()._id}, 
            { $set: {
                profile: {
                    name: name,
                    about: about,                 
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