import '../../../imports/api/jobs.js';

// Display Jobs List
Template.Job_list.helpers({
    jobs(){
        Meteor.subscribe('jobs'); 
        return Jobs.find({},  { sort: { createdAt: -1 }});          
    }
});

// Job Details
Template.Job_details.helpers({
    jobs(){
        Meteor.subscribe('jobs'); 
        id = FlowRouter.getParam("_id");
        return Jobs.findOne({_id: id});           
    }
});

//Update Form
Template.updateJobForm.helpers({
    jobDoc(){
        Meteor.subscribe('job.detail');
        id = FlowRouter.getParam("_id");
        return Jobs.findOne({_id: id}); 
    }
  });
  
  // Delete List
  Template.Job_details.events({
    'click .btn-remove'(){
        jobId = FlowRouter.getParam("_id");
        if(confirm("Do you really want to delete this post?")){
          Meteor.call('deleteJob', jobId);  
          toastr.success('Job Deleted Succesfully!');                    
        };
    }
  });


// Autoform Hooks
AutoForm.addHooks('insertJobForm',{
    onSuccess(formType, result) {
      FlowRouter.go('/jobs/');
      toastr.success('Listing Submitted Succesfully!');      
    }
});

AutoForm.addHooks('updateJobForm',{
    onSuccess(formType, result) {
      FlowRouter.go('/jobs/' + this.docId);
      toastr.success('Listing Updated Succesfully!');                   
    }
});