Session.set("results", "0");
Template.home.helpers({
	searchdata: function(){return DestSearched.find({}, {sort:{searches:-1}});},
	// resultData: function(){
	// 	let loc = Session.get("results");
	// 	return Trips.find({destination: loc},{sort:{datecreated: -1}});
	// },
})
Template.home.events({
	"click .js-gogo": function(event){
		event.preventDefault();
		const destination=$(".js-loca").val().toLowerCase();
		
		Router.go('searchresults');
		Session.set("results", destination);
		// Meteor.call("search", destination);
		if(DestSearched.find({location: destination}).count()==0){
			console.dir("New Destination added to database");
			const search_obj=
			{location: destination,
			searches: 1
			}
			DestSearched.insert(search_obj);
			
		}else{
			console.dir("Destination search incremented");
			DestSearched.update({_id:DestSearched.findOne({location:destination})._id},{$inc:{searches: 1}});
		}
		
		
	},
	msg:function(){return Settings.findOne({user:Meteor.userId()})},
	usersearch:function(){
		//return Session.get("prefer");
		return Trips.find();
	},
	userfavorites:function(){
		return UserFavorites.find();
	}
})
Template.home.events({
	"click .js-gogo": function(event){
		// event.preventDefault();
		const destination=$(".js-loca").val().toLowerCase();
		Session.set("results", destination);

		Meteor.call("tosearch", destination);
		Router.go('searchresults');
		
	},
	"click .js-deletefav ":function(event){
		console.log("clicked on the x"); //debug
		window.alert("You are about to delete this itinerary!");
		var blog= UserFavorites.findOne({_id: this.user});
		Meteor.call("removefav",blog);  //callback->this <--removes object created
	}

})
