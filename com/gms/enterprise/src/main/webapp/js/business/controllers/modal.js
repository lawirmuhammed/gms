// Code goes here
(function(){
var mainApp = angular.module('MainApp')

mainApp.controller('RowEditCtrl', RowEditCtrl);
mainApp.service('RowEditor1', ['$rootScope', '$modal',RowEditor1]);

function RowEditor1($rootScope, $modal) {
  var service = {};
  service.editRow = editRow;
  
  function editRow(grid, row) {
    $modal.open({
      templateUrl: 'html/templates/edit-modal.html',
      controller: ['$modalInstance', 'SaleSchema', 'grid', 'row', RowEditCtrl],
      controllerAs: 'vm',
      resolve: {
        grid: function () { return grid; },
        row: function () { return row; }
      }
    });
  }
  
  return service;
}

function RowEditCtrl($modalInstance, SaleSchema, grid, row) {
  var vm = this;
  
  vm.schema = SaleSchema;
  vm.entity = angular.copy(row.entity);
  vm.form = [
    'totalSale',
    'cashReceived',
    'saleType',
    'description'
  ];
  
  vm.save = save;
  
  function save() {
    // Copy row values over
    row.entity = angular.extend(row.entity, vm.entity);
    $modalInstance.close(row.entity);
  }
}
})