(function(){
	angular.module("app.directives", [])
		.directive("customerDetails", customerDetailsDirective);
	
	function customerDetailsDirective() {
		var directive = {
			restrict: "EA",
			templateUrl: "html/directives/gms-customer-details.html"
		};
				
		return directive;
	}
}());