(function(){
	var mainApp = angular.module('MainApp');
		
	mainApp.controller("ItemController", ["$scope", "ItemService", pointOfSaleController]);
	
	function pointOfSaleController($scope, SalesService) {
		$scope.sale = {};
		$scope.saleType = "Grocery";// SalesService.getAllSales();
		sales = [];		
		
		$scope.searchCustomer = function() {
			searchCustomer($scope.searchText);
		};

		$scope.saveSale =  function(){
			var sale = createSale($scope);
			SalesService.save(sale).$promise.then(function(data){
				sales.unshift(getDisplaySaleFromResponse(data));
			});
		};
		
		var saveSuccessfull = function(data) {
			$scope.saleDescription = "Server call returned";
		}
		
		var saveFailed = function(data) {
			$scope.saleDescription = "Server call Failed";
		}
		
		$scope.sales = sales;
		
		function getDisplaySaleFromResponse(response) {
			return {
				saleId : response.saleId,
				totalSale : response.totalSale,
				cashReceived : response.cashReceived,
				saleType : response.saleType,
				description : response.description
			};
		}
	};

	
	var createSale = function(scope) {
		var sale = {};
		sale.totalSale = scope.totalSale;
		sale.cashReceived = scope.cashReceived;
		sale.saleDescription = scope.saleDescription;
		sale.saleType = scope.saleType;
		sale.customerId = scope.customerId;

		return sale;
	}
	
	mainApp.controller("AddItemController", addItemController);
	function addItemController(){}
	
	mainApp.controller("AddCustomerController", addCustomerController);
	function addCustomerController(){}
	
}());
