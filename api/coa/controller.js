//import { error } from 'util';

'use strict';
//var errorhandler = require('../../middlewares/errorhandler'),
var SR = require('../../config/ServiceRegistry');
var errorHandler = require('../../middlewares/errorhandler');

var logger = require('../../config/logger');

module.exports.query = errorHandler.wrapError(async (req, res) => {
  var COA = SR.GetService('COA');
  const data = await COA.GetByQuery();
  return res.status(200).json(data);
});
module.exports.findOne = errorHandler.wrapError(async (req, res) => {
  var COA = SR.GetService('COA');
  const data = await COA.GetById(req.params.id);
  return res.status(200).json(data);
});

module.exports.create = errorHandler.wrapError(async (req, res, err, next) => {
  console.log('handle');
  var COA = SR.GetService('COA');
  var coa = {};
  coa.name = req.body.name;
  coa.desc = req.body.desc;
  coa.parent = req.body.parent;
  const data = await COA.Create(coa);
  return res.status(201).json(data);
});

module.exports.update = errorHandler.wrapError(async (req, res) => {
  var COA = SR.GetService('COA');
  const data = await COA.Update(req.params.id, req.body);
  return res.status(200).json(data);

  // logger.error('COA>>update>>', error);
  //errorHandler.wrapError(req, res, error);
});

module.exports.delete = errorHandler.wrapError(async (req, res) => {
  var COA = SR.GetService('COA');
  const data = await COA.MarkAsDelete(req.params.id);

  return res.status(200).json('Resource has been deleted');
});
