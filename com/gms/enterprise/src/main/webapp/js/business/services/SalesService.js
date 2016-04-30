(function(){
	var mainApp = angular.module("MainApp");
	mainApp.factory('SalesService', ['$resource', 'Constants', SalesServices]);
	
	function SalesServices($resource, Constants){
		var getSales = {};
		
		getSales.save = function(sale) {
			var saveResource = $resource(Constants.CONTEXT + "/webapi/sales");
			//return saveResource.save(sale);

			var response = saveResource.save(sale);
			return response;
			//response.$promise.then(function(data){
				//var sale = getSaleFromResponse(data);
				//return sale;
			//});
		};
		
		getSales.update = function(sale) {
			var saveResource = $resource(Constants.CONTEXT + "/webapi/sales", null, {
				update: {method: 'PUT'}
			});

			var response = saveResource.update(sale);
			//var sale = getSaleFromResponse(response);
			return response;
		};
		
		getSales.search = function(saleId) {
			var saveResource = $resource(Constants.CONTEXT + "/webapi/sales/:saleId", {saleId : '@saleId'});
			return saveResource.get({saleId: saleId});
		};
		
		getSales.getAllSales = function() {
			var saveResource = $resource(Constants.CONTEXT + "/webapi/sales");
			return saveResource.query();
		};
		
		getSales.sales = getSales.getAllSales().$promise
			.then(function(results){ return results; })
			.catch(function(error) { return []; });
		
		return getSales;
	};
	
}())
