'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Employee = mongoose.model('Employee'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.create = function(req, res) {
  var employee = new Employee(req.body);
  employee.user = req.user;

  employee.save(function(err) {
    if(err) {
      return res.status(400).send({ message: errorHandler.getErrorMessage(err) });
    } else {
      res.jsonp(employee);
    }
  });
};

exports.list = function(req, res) {
  Employee.find().sort('-created').populate('name','address').exec(function(err, employees) {
    if(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(employees);
    }
  });
};