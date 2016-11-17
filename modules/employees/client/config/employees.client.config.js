'use strict';

angular.module('employees').run(['Menus',
  function(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Employees',
      state: 'employees',
      type: 'dropdown',
      roles: ['user']
    });

    Menus.addSubMenuItem('topbar', 'employees', {
      title: 'Create Employees',
      state: 'employees.create',
      roles: ['user']
    });
  }

]);