'use strict';
var errorHandler = require('../../middlewares/errorhandler'),
  SR = require('../../config/ServiceRegistry');

var logger = require('../../config/logger');

module.exports.query = errorHandler.wrapError(async (req, res) => {
  var CustomerService = SR.GetService('Customer');

  var data = await CustomerService.GetByQuery();
  return res.status(200).json(data);
});

module.exports.findOne = errorHandler.wrapError(async (req, res) => {
  var CustomerService = SR.GetService('Customer');
  const data = await CustomerService.GetById(req.params.id);
  return res.status(200).json(data);
});

module.exports.create = errorHandler.wrapError(async (req, res) => {
  var CustomerService = SR.GetService('Customer');
  var customer = {};
  customer.name = req.body.name;

  const data = await CustomerService.Create(customer);
  return res.status(201).json(data);
});

module.exports.update = errorHandler.wrapError(async (req, res) => {
  var CustomerService = SR.GetService('Customer');
  const data = await CustomerService.Update(req.params.id, req.body);
  return res.status(200).json(data);
});

module.exports.delete = errorHandler.wrapError(async (req, res) => {
  var CustomerService = SR.GetService('Customer');
  const data = await CustomerService.MarkAsDelete(req.params.id);
  return res.status(200).json('Resource has been deleted');
});
