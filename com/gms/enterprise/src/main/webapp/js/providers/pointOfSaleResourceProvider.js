(function(){
	angular.module('MainApp').factory('SalesService1', SalesService);
	
	var SalesService = function($resource){
		var service = {};
		var resource = $resource('/exercise-services/webapi/sales/:id');
		
		service.getAllSales = function() {
			resource.get(function(data){
				return data;
			});
		};
		
		return service;
	};
}())