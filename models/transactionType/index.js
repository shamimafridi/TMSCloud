var mongoose = require('mongoose');

var logger = require('../../config/logger');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var VehicleTransactionTypeSchema = new Schema({
  name: String,
  nature: {
    type: String,
    required: true
  },
  stats: {
    created_at: {
      type: Date
    },
    updated_at: {
      type: Date
    },

    created_by: {
      type: String
    },
    updated_by: {
      type: String
    },
    deleted: {
      type: Boolean,
      default: false
    }
  }
});

VehicleTransactionTypeSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at) {
    this.stats.created_at = currentDate;
  }
  next();
});
VehicleTransactionTypeSchema.post('findOneAndUpdate', function (type) {
  var Voucher = global.ActiveClientMongooseConnection.models['Voucher'];
  // save every detail table
  if (!type) return true;
  var s = {
    id: type._doc._id,
    name: type._doc.name
    // description: voucher.description
  };
  Voucher.update({
    'type.id': type._doc._id
  }, {
    $set: {
      'type': s
    }
  }, {
    multi: true
  }, function (err, updated) {
    if (err) {
      logger.error('Error attempting to update voucher.branch with updated branch information: ' + err);
      return next(err);
    }

    logger.info('Voucher VehicleTransactionType Updated ' + updated + ' voucher with updated branch information');
  });
});

// mongoose.model('Customer', CustomerSchema);
module.exports = VehicleTransactionTypeSchema; // mongoose.models.Customer