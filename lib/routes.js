var exposed = FlowRouter.group ({});
var loggedIn = FlowRouter.group({
  triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        if (route.route.name !== 'signin') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go('signin');
      }
    }
  ]
});

FlowRouter.notFound = {
    name: 'notFound',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "NotFound" });
    }
}

exposed.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Home" });
    }
});

exposed.route('/about', {
    name: 'about',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "About" });
    }
});

exposed.route('/contact', {
    name: 'contact',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Contact" });
    }
});

loggedIn.route('/tasks', {
    name: 'tasks',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Tasks" });
    }
});

loggedIn.route('/add-list', {
    name: 'add-list',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Add_place" });
    }
});


exposed.route('/places', {
    name: 'places',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Airbnb_list" });
    }
});

exposed.route('/places/:_id', {
    name: 'place-detail',
    action(params) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Place_detail" });
    }
});

loggedIn.route('/update-place/:_id', {
    name: 'place-update',
    action(params, queryParams) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Place_update" });
    }
});

loggedIn.route('/edit-profile', {
    name: 'edit-profile',
    action(params, queryParams) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Edit_profile" });
    }
});







