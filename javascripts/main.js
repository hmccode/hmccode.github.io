var mainService = new function () {
	var organizations,
	
	parseRepositories = function() {
		var deferred = $.Deferred();

		if (organizations != null) {
			console.log('parseRepositories cache hit');
			deferred.resolve(organizations);
		} else {
			console.log('parseRepositories fetch from Internet');
			$.getJSON("https://miscwebjobs.blob.core.windows.net/jsons/repositories.json", function(data) {
				organizations = data;
				deferred.resolve(data);
			});
		}
		
		return deferred.promise();
	};

    return {
		parseRepositories: parseRepositories
	};
}();
