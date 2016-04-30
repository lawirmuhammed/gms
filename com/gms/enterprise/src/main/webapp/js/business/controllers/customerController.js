(function(){
	var mainApp = angular.module('MainApp');
	
	mainApp.controller("CustomerController", ["$scope", "CustomerService", customerController]);
	function customerController($scope, CustomerService){
		var customerFields;
		initController();
				
		$scope.createCustomer = function() {
			$scope.failedReason = undefined;
			var customer = $scope.customer;
			CustomerService.createCustomer(customer)
				.$promise
				.then(function(data){
					$scope.customer.customerId = data[customerFields.ID];
					$scope.pageDisabled = true;
				})
				.catch(function(reason){
					
				});
		}

		$scope.filterCustomer = function(customer) {
			return CustomerService.filterCustomer($scope.customerFilter, customer);
		}
		
		$scope.resetPage = function() {
			$scope.customer = {};
			$scope.pageDisabled = false;
		}
		
		$scope.cancelCreation = function() {
			$scope.customer = {};
		}
		
		function createCustomerSuccess(customer) {
			$scope.customer.customerId = customer[customerFields.ID];
			$scope.pageDisabled = true;
		}
		
		function createCustomerFailed(reason) {
			$scope.failedReason = reason;
			$scope.pageDisabled = false;
		}
		
		function initController() {
			$scope.customers = CustomerService.getCustomers();
			customerFields = CustomerService.getCustomerFields();
			$scope.pageDisabled = false;
		}
	}
	
}());
