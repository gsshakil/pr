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


exposed.route('/projects', {
    name: 'projects',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Airbnb_list" });
    }
});

exposed.route('/projects/:_id', {
    name: 'project-detail',
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

exposed.route('/people', {
    name: 'people-list',
    action(params) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "People_list" });
    }
});

exposed.route('/people/details', {
    name: 'people-details',
    action(params) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "User_details" });
    }
});

loggedIn.route('/profile', {
    name: 'user-details',
    action(params) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "User_details" });
    }
});

exposed.route('/jobs', {
    name: 'job-list',
    action(params) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Job_list" });
    }
});

loggedIn.route('/add-job', {
    name: 'add-job',
    action() {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Add_job" });
    }
});

exposed.route('/jobs/:_id', {
    name: 'job-details',
    action(params) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Job_details" });
    }
});

loggedIn.route('/update-job/:_id', {
    name: 'job-update',
    action(params, queryParams) {
        BlazeLayout.render('layout1', { top: "Navbar", main: "Job_update" });
    }
});