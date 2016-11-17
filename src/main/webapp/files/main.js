"use strict";

(function(win) {
	var baseUrl = document.getElementById("scriptTag").getAttribute("data-baseUrl");
	
	var option = {
		baseUrl: baseUrl,
		paths: {
			"angular": "libs/angular",
			"ui-route": "libs/angular-ui-router.min",
			"underscore": "libs/underscore-min",
			"text": "libs/text",
			"utils": "js/utils",
			"jquery": "libs/jquery.min",
			"jqueryUI": "libs/jquery-ui.min",
			"widget": "js/component/layer/widget",
			"layer": "js/component/layer/window"
		},
		shim: {
			"underscore": {
				exports: '_'
			},
			"angular": {
				exports: "angular"
			},
			"ui-route": {
				deps: ["angular"],
				exports: "angular-route"
			}
		},
		urlArgs: "t=" + (+new Date())
	}
	
	require.config(option);	
	
	require(['angular', 'router'], function(angular, router) {
		angular.bootstrap(document, ['myApp']);
	})
	
})(window);


