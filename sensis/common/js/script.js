var st = st || {};

//set underscore to have {{ }} terms
_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g,
	evaluate: /\{%([\s\S]+?)%\}/g
};

st.test = function () {
	this._footieTable;
	this.$pageContainer;
	this.footballData;
};

st.test.prototype = {
	init: function () {
		this._footieTable = _.template($('#footie-table').html());
		this.$pageContainer = $('.page-container');

		this.getData();
	}
	, getData: function () {
		var self = this;
		$.getJSON('/sensis/common/data/football.json', function(json, textStatus) {
			self.footballData = json;
			self.fillTemplate();
		});
	}
	, fillTemplate: function () {
		var teamWithLeast = this.getTeamWithLeastGoalDiff()
			, templateDate = {
				teamWithLeast: teamWithLeast,
				teams: this.footballData.teams
			}
			, renderedContent = this._footieTable(templateDate);
		this.$pageContainer.append(renderedContent);
	}
	, getTeamWithLeastGoalDiff: function () {
		var self = this,
			teamWithSmallest = _.min(self.footballData.teams, function(team){ return Math.abs(team.f - team.a); });
		return teamWithSmallest.name;
	}
}

$(function() {
	st.site = new st.test();
	st.site.init();
});