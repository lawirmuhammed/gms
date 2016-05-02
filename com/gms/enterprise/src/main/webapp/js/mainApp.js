var context = "/pointOfSale";
(function(){	
	//['ui.grid', 'ui.grid.edit', 'ui.bootstrap', 'schemaForm']
	angular.module("MainApp", 
			['ngResource','ngRoute','ui.grid','ui.grid.edit', 
			 'ui.bootstrap', 'schemaForm', 
			 'app.constants', 'app.config',
			 'app.directives']);
}());
