 'use strict';
 var errorHandler = require('../../middlewares/errorhandler'),
     SR = require('../../config/ServiceRegistry');

 var logger = require('../../config/logger');

 module.exports.query = errorHandler.wrapError(async(req, res) => {
     var Voucher = SR.GetService('Voucher');
     const data = await Voucher.GetByQuery();
     return res.status(200).json(data);
 });

 module.exports.findOne = errorHandler.wrapError(async(req, res) => {
     var Voucher = SR.GetService('Voucher');
     const data = await Voucher.GetById(req.params.id);
     return res.status(200).json(data);
 });


 module.exports.create = errorHandler.wrapError(async(req, res) => {
     var Voucher = SR.GetService('Voucher');
     var voucher = {};
     voucher.date = req.body.date;
     voucher.branch = req.body.branch;
     voucher.desc = req.body.desc;
     voucher.voucher_detail = req.body.voucher_detail;

     const data = await Voucher.Create(voucher);
     return res.status(201).json(data);
 });

 module.exports.update = errorHandler.wrapError(async(req, res) => {
     var Voucher = SR.GetService('Voucher');
     const data = await Voucher.Update(req.params.id, req.body);
     return res.status(200).json(data);
 });

 module.exports.delete = errorHandler.wrapError(async(req, res) => {
     var Voucher = SR.GetService('Voucher');
     const data = await Voucher.MarkAsDelete(req.params.id);
     return res.status(200).json('Resource has been deleted');
 });