(function(){
	var mainApp = angular.module("MainApp");
	
	mainApp.factory("CustomerService",["$resource", "Constants", CustomerService]);
	
	function CustomerService($resource, Constants) {		
		var customerService = {};
		var customers = [];
		
		initService();
		
		customerService.searchCustomer = function(customerId) {
			var customerResource = $resource(Constants.CONTEXT +"/webapi/customers/:customerId", 
								{"customerId":"@customerId"});
			return customerResource.get({"customerId":customerId});
		};
		
		customerService.createCustomer = function(customer) {
			var customerResource = $resource(Constants.CONTEXT + "/webapi/customers");
			return customerResource.save(customer);
		};
		
		customerService.updateCustomer = function(customer) {
			var customerResource = $resource(Constants.CONTEXT + "/webapi/customers",{"update":{"method":"PUT"}});
			return customerResource.update(customer);
		};
		
		customerService.getCustomers = function() {
			return customers;
		} 
		
		customerService.filterCustomer = function(filter, customer) {
			if (!filter) {
				return true;
			}
			
			var custDisplay = getCustomerAsString(customer);
			var index = custDisplay.indexOf(filter);
			
			return getCustomerAsString(customer).indexOf(filter) != -1;
		}
		
		customerService.getCustomerFields = function() {
			return customerFields;
		}
		
		
		function getCustomerAsString(customer) {
			return customer[customerFields.ID] + ": " + 
				   customer[customerFields.FIRST_NAME] + " " + 
				   customer[customerFields.LAST_NAME];
		}
		
		function getCustomers() {
			var customerResource = $resource(Constants.CONTEXT +"/webapi/customers");
			customerResource.query().$promise
				.then(getCustomersSuccess)
				.catch(getCustomersFailed);
		};
		
		function getCustomersSuccess(data) {
			for (var i = 0; i < data.length; i++) {
				customers.push(data[i]);
			}
		}
		
		function getCustomersFailed() {}
		
		function initService() {
			getCustomers();
		}
		
		var customerFields = {
				"ID" : "customerId",
				"FIRST_NAME" : "firstName",
				"LAST_NAME" : "lastName"
		};
		
		return customerService;
	}
}())