'use strict';

var employeesPolicy = require('../policies/employees.server.policy'),
  employees = require('../controllers/employees.server.controller');

module.exports = function(app) {
  app.route('/api/employees').all(employeesPolicy.isAllowed)
  .get(employees.list)
  .post(employees.create);
};