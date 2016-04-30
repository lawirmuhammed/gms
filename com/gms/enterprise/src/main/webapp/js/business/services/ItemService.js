(function(){
	var mainApp = angular.module("MainApp");
	
	mainApp.factory("ItemService",["$resource", "Constants", ItemService]);
	
	function ItemService($resource, Constants) {		
		var itemService = {};
		
		//console.log("Print values from CustomerService");
		//console.log(test.fname);
		//console.log(test.lname);
		
		//test.fname = "CustomerServiceLawir";
		
		itemService.searchSearch = function(ItemId) {
			var itemResource = $resource(Constants.CONTEXT + "/webapi/items/:itemId", 
								{"itemId":"@itemId"});
			return itemResource.get({"itemId":itemId});
		};
		
		itemService.createItem = function(item) {
			var itemResource = $resource(Constants.CONTEXT + "/webapi/items");
			return itemResource.save(item);
		};
		
		itemService.updateItem = function(item) {
			var itemResource = $resource(Constants.CONTEXT + "/webapi/items",{"update":{"method":"PUT"}});
			return itemResource.update(item);
		};
		
		return itemService;		
	}
}())