(function() {
  'use strict';

  angular.module('employees')
  .controller('EmployeesController', EmployeesController);

  EmployeesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'employeeResolve'];

  function EmployeesController($scope, $state, $window, Authentication, employee) {
    var vm = this;

    vm.authentication = Authentication;
    vm.employee = employee;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    function save(isValid) {
      if(!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeeForm');
        return false;
      }

      if(vm.employee._id) {
        vm.employee.$update(successCallback, errorCallback);
      } else {
        vm.employee.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('employees.view', {
          employeeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function remove() {
        
    }

  }

}());