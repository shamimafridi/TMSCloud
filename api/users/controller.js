'use strict';
var errorHandler = require('../../middlewares/errorhandler'),
  userService = require('./../../services/user'),
  UserService = new userService();

var logger = require('../../config/logger');

module.exports.query = errorHandler.wrapError(async (req, res) => {
  const data = await UserService.GetByQuery();
  return res.status(200).json(data);
});
module.exports.me = errorHandler.wrapError(async (req, res) => {
  const data = UserService.GetByQuery();
  return res.status(200).json(data);
});
module.exports.findOne = errorHandler.wrapError(async (req, res) => {
  const data = await UserService.GetById(req.params.id);
  return res.status(200).json(data);
});
module.exports.create = errorHandler.wrapError(async(req, res) => {
  var customer = {};
  customer.name = req.body.name;

  const data = UserService.Create(customer);
  return res.status(201).json(data);
});


module.exports.update = errorHandler.wrapError(async(req, res) => {
  const promise = await UserService.Update(req.params.id, req.body);
  return res.status(200).json(data);
});

module.exports.delete = errorHandler.wrapError(async(req, res) => {
  const data = await UserService.MarkAsDelete(req.params.id);
  return res.status(200).json('Resource has been deleted');
});