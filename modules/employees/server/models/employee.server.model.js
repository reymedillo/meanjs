'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator');

var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

var EmployeeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your name']
  },
  address: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your address']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Employee', EmployeeSchema);