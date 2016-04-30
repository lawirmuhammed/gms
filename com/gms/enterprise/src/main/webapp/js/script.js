// Code goes here

angular.module('modal.editing', ['ui.grid', 'ui.grid.edit', 'ui.bootstrap', 'schemaForm'])

.constant('PersonSchema', {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    company: { type: 'string', title: 'Company' },
    phone: { type: 'string', title: 'Phone' },
    'address.city': { type: 'string', title: 'City' }
  }
})

.controller('MainCtrl', MainCtrl)
.controller('RowEditCtrl', RowEditCtrl)
.service('RowEditor', RowEditor)
;

MainCtrl.$inject = ['$http', 'RowEditor'];
function MainCtrl ($http, RowEditor) {
  var vm = this;
  
  vm.editRow = RowEditor.editRow;
  
  vm.gridOptions = {
    columnDefs: [
      { field: 'id', name: '', cellTemplate: 'edit-button.html', width: 34 },
      { name: 'name' },
      { name: 'company' },
      { name: 'phone' },
      { name: 'City', field: 'address.city' },
    ]
  };
  
  $http.get('http://ui-grid.info/data/500_complex.json')
    .success(function (data) {
      vm.gridOptions.data = data;
    });
}

RowEditor.$inject = ['$rootScope', '$modal'];
function RowEditor($rootScope, $modal) {
  var service = {};
  service.editRow = editRow;
  
  function editRow(grid, row) {
    $modal.open({
      templateUrl: 'edit-modal.html',
      controller: ['$modalInstance', 'PersonSchema', 'grid', 'row', RowEditCtrl],
      controllerAs: 'vm',
      resolve: {
        grid: function () { return grid; },
        row: function () { return row; }
      }
    });
  }
  
  return service;
}

function RowEditCtrl($modalInstance, PersonSchema, grid, row) {
  var vm = this;
  
  vm.schema = PersonSchema;
  vm.entity = angular.copy(row.entity);
  vm.form = [
    'name',
    'company',
    'phone',
    {
      'key': 'address.city',
      'title': 'City'
    },
  ];
  
  vm.save = save;
  
  function save() {
    // Copy row values over
    row.entity = angular.extend(row.entity, vm.entity);
    $modalInstance.close(row.entity);
  }
}

/*
{
    "id": 0,
    "guid": "de3db502-0a33-4e47-a0bb-35b6235503ca",
    "isActive": false,
    "balance": "$3,489.00",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "name": "Sandoval Mclean",
    "gender": "male",
    "company": "Zolavo",
    "email": "sandovalmclean@zolavo.com",
    "phone": "+1 (902) 569-2412",
    "address": {
        "street": 317,
        "city": "Blairstown",
        "state": "Maine",
        "zip": 390
    },
    "about": "Fugiat velit laboris sit est. Amet eu consectetur reprehenderit proident irure non. Adipisicing mollit veniam enim veniam officia anim proident excepteur deserunt consectetur aliquip et irure. Elit aliquip laborum qui elit consectetur sit proident adipisicing.\r\n",
    "registered": "1991-02-21T23:02:31+06:00",
    "friends": [
        {
            "id": 0,
            "name": "Rosanne Barrett"
        },
        {
            "id": 1,
            "name": "Nita Chase"
        },
        {
            "id": 2,
            "name": "Briggs Stark"
        }
    ]
}
*/