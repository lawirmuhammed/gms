(function(){
	var mainApp = angular.module('MainApp');
	//God1sgre@t	
	mainApp.controller("PointOfSaleController", 
			["$scope", "SalesService", "CustomerService", "RowEditor", pointOfSaleController]);
	
	function pointOfSaleController($scope, SalesService, CustomerService, RowEditor) {
		initScope($scope);
		$scope.editRow = RowEditor.editRow;
		$scope.sale = {};
		$scope.saleType = "Grocery";// SalesService.getAllSales();
		sales = [];
		
		$scope.searchCustomer = function() {
			searchCustomer($scope.searchText);
		};

		$scope.saveSale =  function(){
			var sale = createSale($scope);
			SalesService.save(sale).$promise.then(function(data){
				sales.unshift(data);
			});
		};
		
		$scope.clearEntries = function() {
			$scope.totalSale = "";
			$scope.cashReceived = "";
			$scope.description = "";
			$scope.customerId = "";
			console.log("Writing to the console")
		}
		
		$scope.filterCustomer = function(customer) {
			return CustomerService.filterCustomer($scope.customerFilter, customer);
		}
		
		var saveFailed = function(data) {
			$scope.saleDescription = "Server call Failed";
		}
				
		/* ###################################################################
		http://brianhann.com/create-a-modal-row-editor-for-ui-grid-in-minutes/
		###################################################################*/
		var grid = createAndConfigureGrid();
		grid.data = sales;
		
		SalesService.getAllSales().$promise.then(function(data){
			sales.length = 0 // Reset this. For some reason, refreshing calls page twice.
			for (var i=0; i < data.length; i++) {
				sales.unshift(data[i]);
			}
		});
		
		$scope.grid = grid;
		
		function getDisplaySaleFromResponse(response) {
			return {
				saleId : response.saleId,
				totalSale : response.totalSale,
				cashReceived : response.cashReceived,
				saleType : response.saleType,
				description : response.description
			};
		}
		
		function createAndConfigureGrid() {
			var grid = {};
			grid.gridOptions = {
				enableColumnResize: true,
			};
			grid.columnDefs = [
           		{ name: 'saleDate', type: 'date', cellFilter: 'date:\'hh:mm:ss dd-MM-yyyy\'', enableCellEdit: false, width: '10%' },
      		    { name: 'saleId', enableCellEdit: false, width: '10%' },
      		    { name: 'totalSale', enableCellEdit: false, type: 'number', width: '20%' },
      		    { name: 'cashReceived', enableCellEdit: false, type: 'number', width: '10%' },
      		    { name: 'saleType', enableCellEdit: false, type: 'number', width: '20%' },
      		    { name: 'description', enableCellEdit: false, width: '20%' } ,
			    { field: 'id', enableCellEdit: false, name: '', cellTemplate: 'html/edit-button.html', width: 34 }     		    
      		  ];
			
			return grid;
		}
		
		function initScope() {
			$scope.customers = CustomerService.getCustomers();
		}
	};
	
	var createSale = function(scope) {
		var sale = {};
		sale.totalSale = scope.totalSale;
		sale.cashReceived = scope.cashReceived;
		sale.saleDescription = scope.description;
		sale.saleType = scope.saleType;
		sale.customerId = scope.customerId;

		return sale;
	}
	
	mainApp.service('RowEditor', ['$rootScope', '$modal',RowEditor]);

	function RowEditor($rootScope, $modal) {
	  var service = {};
	  service.editRow = editRow;
	  
	  function editRow(grid, row) {
	    $modal.open({
	      templateUrl: 'html/edit-modal.html',
	      controller: ['SalesService', '$modalInstance', 'SaleSchema', 'grid', 'row', RowEditCtrl],
	      controllerAs: 'vm',
	      resolve: {
	        grid: function () { return grid; },
	        row: function () { return row; }
	      }
	    });
	  }
	  
	  return service;
	}
	

	mainApp.controller('RowEditCtrl', ['SalesService','$modalInstance','SaleSchema',RowEditCtrl]);

	function RowEditCtrl(SalesService, $modalInstance, SaleSchema, grid, row) {
		var vm = this;
			
		vm.schema = SaleSchema;
		vm.entity = angular.copy(row.entity);
		vm.form = [
			'totalSale',
			'cashReceived',
			'saleType',
			'description',
			'reasonForChange'
		];
			
		vm.save = save;
			
		function save() {
				// Copy row values over
				//row.entity = angular.extend(row.entity, vm.entity);
				var sale = vm.entity;
				var valid = validateEditSale(sale);
				
				if (!valid) {
					alert ('Please enter data for all fields.')
					return;
				}
				
				SalesService.update(sale).$promise.then(function(data){
					//sales.unshift(getDisplaySaleFromResponse(data));
					alert('Save completed');
					//row.entity = angular.extend(row.entity, vm.entity);
					angular.extend(row.entity, vm.entity);
					$modalInstance.close(row.entity);
				});
		}
	}
	
	function validateSale(sale) {
		return true;
	}
	
	function validateEditSale(sale) {
		var valid = validateSale(sale)
		if (!valid) {
			return false;
		}
		
		if (!sale.reasonForChange) {
			return false;
		}
		
		return true;
	}
}());
