(function(){
	angular.module("app.config", [])
		.config(["$routeProvider", "Constants", "CONTEXT", doConfigurations]);
	
	function doConfigurations($routeProvider, Constants, CONTEXT) {		
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
	};
}());