'use strict';
var errorHandler = require('../../middlewares/errorhandler'),
  SR = require('../../config/ServiceRegistry');

module.exports.query = errorHandler.wrapError(async (req, res) => {
  var transactionType = SR.GetService('transactionType');
  const data = await transactionType.GetByQuery();
  return res.status(200).json(data);
});
module.exports.findOne = errorHandler.wrapError(async (req, res) => {
  var transactionType = SR.GetService('transactionType');
  var data = await transactionType.GetById(req.params.id);
  promise
    .then(function(data) {
      return res.status(200).json(data);
    })
    .catch(function(err) {
      logger.error('transactionType>>query>>', err);
      // errorhandler.SendError(req, res);
      return res.status(500).send(err);
    });
});
module.exports.create = errorHandler.wrapError(async (req, res) => {
  var transactionType = SR.GetService('transactionType');
  var branch = {};
  branch.name = req.body.name;

  var data = await transactionType.Create(branch);
  return res.status(201).json(data);
});

module.exports.update = errorHandler.wrapError(async (req, res) => {
  var transactionType = SR.GetService('transactionType');
  const data = await transactionType.Update(req.params.id, req.body);
  return res.status(200).json(data);
});

module.exports.delete = errorHandler.wrapError(async (req, res) => {
  var transactionType = SR.GetService('transactionType');
  const data = await transactionType.MarkAsDelete(req.params.id);
  return res.status(200).json('Resource has been deleted');
});
