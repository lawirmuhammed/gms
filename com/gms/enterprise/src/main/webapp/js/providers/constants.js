(function(){	
	var stringConstants = {
			"BASE_URL" : "http://localhost:8080/pointOfSale",
			"CONTEXT" : "/pointOfSale",
			"SERVICE_CONTEXT" : "/webapi"
	};
	
	angular.module("app.constants", [])
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
}());