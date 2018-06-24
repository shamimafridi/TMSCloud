'use strict';
// var TransactionType;

function TransactionTypeService (model_ctx) {
  // TransactionType = model_ctx;
}

module.exports = TransactionTypeService;

TransactionTypeService.prototype.TransactionType;

TransactionTypeService.prototype.GetById = function (id) {
  return TransactionType.findById({
    _id: id,
    'stats.deleted': false
  }, {
    '__v': 0,
    'stats.deleted': 0,
    'stats.updated_by': 0
  }).exec();
};

TransactionTypeService.prototype.GetByQuery = function (query) {
  // var TransactionType = new this.TransactionType();
  var TransactionType = global.ActiveClientMongooseConnection.models['TransactionType'];
  if (query) { return TransactionType.find(query).exec(); }

  return TransactionType.find({
    'stats.deleted': false
  }, {
    '__v': 0,
    'stats.deleted': 0,
    'stats.updated_by': 0
  }).exec();
};

TransactionTypeService.prototype.Create = function (model) {
  var TransactionType = new this.TransactionType(); // global.ActiveClientMongooseConnection.models['TransactionType'];
  TransactionType.name = model.name;

  return TransactionType.save();
};

TransactionTypeService.prototype.Update = function (id, model) {
  var TransactionType = global.ActiveClientMongooseConnection.models['TransactionType'];
  return TransactionType.findOneAndUpdate({
    _id: id
  }, {
    $set: model
  }, {
    new: true
  }).exec();
};

TransactionTypeService.prototype.MarkAsDelete = function (id) {
  return TransactionType.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      'stats.deleted': true
    }
  }).exec();
};
