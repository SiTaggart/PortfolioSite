var st = st || {};

//set underscore to have {{ }} terms
_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g,
	evaluate: /\{%([\s\S]+?)%\}/g
};

/**
* Create object for test functionality and use prototypal lovelyness
* @method test
* @for st
*/
st.test = function () {
	//set some public properties, use prefixes to identify object types
	this._footieTable;
	this.$pageContainer;
	this.footballData;
};

//extend test object with additional methods
st.test.prototype = {
	/**
	* Initialise the test object to set properties and get this going
	* @method init
	* @for st.test
	*/
	init: function () {
		//fill properties
		this._footieTable = _.template($('#footie-table').html());
		this.$pageContainer = $('.page-container');
		//call getData
		this.getData();
	}
	/**
	* Used to get the JSON data from the server
	* @method getData
	* @for st.test
	*/
	, getData: function () {
		//reference this for change of scope
		var self = this;
		//jQuery getJSON object
		$.getJSON('/sensis/common/data/football.json', function(json, textStatus) {
			//fill property with return json
			self.footballData = json;
			//now call fillTemplate once you've got data
			self.fillTemplate();
			//No error handling, in reallife you'd call a service and handle success and fail
		});
	}
	/**
	* Used to fill the underscore template with data and render the html
	* @method fillTemplate
	* @for st.test
	*/
	, fillTemplate: function () {
		//get the team name to display
		var teamWithLeast = this.getTeamWithLeastGoalDiff()
			//create an object to hold the data for the template with returned team name
			, templateDate = {
				teamWithLeast: teamWithLeast,
				teams: this.footballData.teams
			}
			//grab the rendered html from the template
			, renderedContent = this._footieTable(templateDate);
		//Add the html to the page
		this.$pageContainer.append(renderedContent);
	}
	/**
	* Figure out the team with the least goal difference, the main part of the exercise
	* @method getTeamWithLeastGoalDiff
	* @for st.test
	* @return <string> team name from data with smallest goal diff
	*/
	, getTeamWithLeastGoalDiff: function () {
		//reference this for scope change
		var self = this,
			//use the excellent underscore utilities to perform the diff
			teamWithSmallest = _.min(self.footballData.teams, function(team){ return Math.abs(team.f - team.a); });
		//return the team name
		return teamWithSmallest.name;
	}
}
//dom ready
$(function() {
	st.site = new st.test();
	st.site.init();
});