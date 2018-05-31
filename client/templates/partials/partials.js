Template.Navbar.events({
  'click .btn-logout'(event, instance){
      AccountsTemplates.logout();
  }
});

Template.Navbar.helpers({
  profile(){
      Meteor.subscribe('users');        
      return Meteor.users.findOne({_id: Meteor.user()._id}).profile;
    }
});
