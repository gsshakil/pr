import '../../../imports/api/place.js';

Template.registerHelper('formateDate', (date)=>{
	return moment(date).format('MMMM YYYY');
});