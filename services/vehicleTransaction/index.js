'use strict';
var VehicleTransaction;

function VehicleTransactionService (model) {
  VehicleTransaction = model;
}

module.exports = VehicleTransactionService;

// VehicleTransactionService.prototype.VehicleTransaction;

VehicleTransactionService.prototype.GetById = function (id) {
  return VehicleTransaction.findById({
    _id: id,
    'stats.deleted': false
  }, {
    '__v': 0,
    'stats.deleted': 0,
    'stats.updated_by': 0
  }).exec();
};

VehicleTransactionService.prototype.GetByQuery = function (query) {
  // var VehicleTransaction = new this.VehicleTransaction();
  var VehicleTransaction = global.ActiveClientMongooseConnection.models['VehicleTransaction'];
  if (query) { return VehicleTransaction.find(query).exec(); }

  return VehicleTransaction.find({
    'stats.deleted': false
  }, {
    '__v': 0,
    'stats.deleted': 0,
    'stats.updated_by': 0
  }).exec();
};

VehicleTransactionService.prototype.Create = function (model) {
  var vehicleTransaction = new this.VehicleTransaction(); // global.ActiveClientMongooseConnection.models['VehicleTransaction'];
  vehicleTransaction.branch = model.branch;
  vehicleTransaction.coa = model.coa;
  vehicleTransaction.type = model.type;
  vehicleTransaction.date = model.date;

  vehicleTransaction.narration = model.narration;
  vehicleTransaction.instrumental_type = model.instrumental_type;
  vehicleTransaction.vehicle_reg_no = model.vehicle_reg_no;

  vehicleTransaction.desc = model.desc;
  vehicleTransaction.transaction_detail = model.transaction_detail;

  return vehicleTransaction.save();
};

VehicleTransactionService.prototype.Update = function (id, model) {
  var VehicleTransaction = global.ActiveClientMongooseConnection.models['VehicleTransaction'];
  return VehicleTransaction.findOneAndUpdate({
    _id: id
  }, {
    $set: model
  }, {
    new: true
  }).exec();
};

VehicleTransactionService.prototype.MarkAsDelete = function (id) {
  return VehicleTransaction.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      'stats.deleted': true
    }
  }).exec();
};
