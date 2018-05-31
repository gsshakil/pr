import { Template } from 'meteor/templating';
 
import '../../../imports/api/tasks.js';
import '../../../imports/api/methods.js';
 
import './tasks.html';

Template.Tasks.helpers({
    tasks() {
        // Show newest tasks at the top
        Meteor.subscribe('tasks');
        return Tasks.find({ userId: Meteor.user()._id }, { sort: { createdAt: -1 } });
    },
});

Template.Tasks.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();
    
        // Get value from form element
        const target = event.target;
        const text = target.text.value;
    
        // Insert a task into the collection
        Meteor.call('insertTask', text);        
    
        // Clear form
        target.text.value = '';
    },
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Meteor.call('updateTask', this._id);                                 
    },
    'click .delete'() {
        if(confirm("Do you really want to delete this post?")){
            Meteor.call('deleteTask', this._id);                                 
        };
    },
});