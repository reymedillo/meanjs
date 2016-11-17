(function() {
  'use strict';

  angular.module('employees')
  .factory('EmployeesService', EmployeesService);

  EmployeesService.$inject = ['$resource'];

  function EmployeesService($resource) {
    return $resource('api/employees/:employeeId', {
      bookId: '@_id'
    },
      {
        update: {
          method: 'PUT'
        }
      }

  );
  }


}());