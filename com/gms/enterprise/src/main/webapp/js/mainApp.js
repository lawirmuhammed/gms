var context = "/pointOfSale";
(function(){
	
	var stringConstants = {
			"BASE_URL" : "http://localhost:8080/pointOfSale",
			"CONTEXT" : "/pointOfSale",
			"SERVICE_CONTEXT" : "/webapi"
	};
	
	['ui.grid', 'ui.grid.edit', 'ui.bootstrap', 'schemaForm']
	angular.module("MainApp", ['ngResource','ngRoute','ui.grid','ui.grid.edit', 'addressFormatter', 'ui.bootstrap', 'schemaForm'])
	.constant('SaleSchema', {
		type: 'object',
		properties: {
			totalSale: { type: 'string', title: 'Total Sale' },
			cashReceived: { type: 'string', title: 'Cash Received' },
			saleType: { type: 'string', title: 'SaleType' },
			description: { type: 'string', title: 'Description' },
			reasonForChange: { type: 'string', title: 'Reason For Change' }
		}
	})
	.constant("Constants", stringConstants)
	.constant("CONTEXT", "/pointOfSale");
	 
	angular.module('addressFormatter', []).filter('address', function () {
	  return function (input) {
	      return input.street + ', ' + input.city + ', ' + input.state + ', ' + input.zip;
	  };
	});
	
	var mainApp = angular.module("MainApp");
	
	mainApp.config(["$routeProvider", "Constants", "CONTEXT", function($routeProvider, Constants, CONTEXT){
		
		$routeProvider
			.when('/', {
				templateUrl: Constants.CONTEXT + '/html/pointOfSale.html',
				controller: 'PointOfSaleController'
			})
			.when('/pointOfSale', {
				templateUrl: Constants.CONTEXT + '/html/pointOfSale.html',
				controller: 'PointOfSaleController'
			})
			.when('/addItem', {
				templateUrl: Constants.CONTEXT + '/html/addItem.html',
				controller: 'ItemController'
			})
			.when('/addCustomer', {
				templateUrl: context + '/html/addCustomer.html',
				controller: 'CustomerController'
			})
			.when('/experiment', {
				templateUrl: context + '/html/experiment.html',
				controller: 'Experiment'
			})
			.when('/modal', {
				templateUrl: context + '/html/modal.html',
				controller: 'Modal'
			})
	}]);
		

}());
