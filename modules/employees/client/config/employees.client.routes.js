(function () {
  'use strict';

  angular.module('employees')
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider.state('employees', {
      abstract: true,
      url: '/employees',
      template: '<ui-view/>'
    })
    .state('employees.create', {
      url: '/create',
      templateUrl: 'modules/employees/client/views/form-employee.client.view.html',
      controller: 'EmployeesController',
      controllerAs: 'vm',
      resolve: {
        employeeResolve: newEmployee
      },
      data: {
        roles: ['user', 'admin'],
        pageTitle: 'Employee Create'
      }
    });
  }

  newEmployee.$inject = ['EmployeesService'];

  function newEmployee(EmployeesService) {
    return new EmployeesService();
  }

}());