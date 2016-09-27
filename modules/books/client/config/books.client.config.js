'use strict';

// Configuring the Books module
angular.module('books').run(['Menus',
  function (Menus) {
    // Add the books dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Books',
      state: 'books',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'books', {
      title: 'List Books',
      state: 'books.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'books', {
      title: 'Create Books',
      state: 'books.create',
      roles: ['user']
    });
  }
]);
