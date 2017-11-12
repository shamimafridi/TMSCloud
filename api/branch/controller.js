 'use strict';
 var errorHandler = require('../../middlewares/errorhandler'),
     SR = require('../../config/ServiceRegistry');


 module.exports.query = errorHandler.wrapError(async(req, res) => {
     var Branch = SR.GetService('Branch');
     const data = await Branch.GetByQuery();
     return res.status(200).json(data);

 });
 module.exports.findOne = errorHandler.wrapError(async(req, res) => {
     var Branch = SR.GetService('Branch');
     var data = await Branch.GetById(req.params.id);
     promise.then(function (data) {
             return res.status(200).json(data);
         })
         .catch(function (err) {
             logger.error('Branch>>query>>', err);
             errorhandler.SendError(req, res);
         });
 });
 module.exports.create = errorHandler.wrapError(async(req, res) => {
     var Branch = SR.GetService('Branch');
     var branch = {};
     branch.name = req.body.name;

     var data = await Branch.Create(branch);
     return res.status(201).json(data);
 });

 module.exports.update = errorHandler.wrapError(async(req, res) => {
     var Branch = SR.GetService('Branch');
     const data = await Branch.Update(req.params.id, req.body);
     return res.status(200).json(data);
 });

 module.exports.delete = errorHandler.wrapError(async(req, res) => {
     var Branch = SR.GetService('Branch');
     const data = await Branch.MarkAsDelete(req.params.id);
     return res.status(200).json('Resource has been deleted');

 });