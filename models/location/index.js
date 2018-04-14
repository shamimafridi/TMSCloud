var mongoose = require('mongoose');

var logger = require('../../config/logger');

var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

var LocationSchema = new Schema({
  name: String,
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

LocationSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at) {
    this.stats.created_at = currentDate;
  }
  next();
});
LocationSchema.post('findOneAndUpdate', function (location) {
  var VehicleTransaction = global.ActiveClientMongooseConnection.models['VehicleTransaction'];
  // save every detail table
  if (!location) return true;
  var s = {
    id: location._doc._id,
    name: location._doc.name
    // description: voucher.description
  };
  VehicleTransaction.update({
    'pickupLocation.id': location._doc._id
  }, {
    $set: {
      'pickupLocation': s
    }
  }, {
    multi: true
  }, function (err, updated) {
    if (err) {
      logger.error('Error attempting to update voucher.branch with updated branch information: ' + err);
      //  return next(err);
    }

    logger.info('Voucher Branch Updated ' + updated + ' voucher with updated branch information');
  });

  VehicleTransaction.update({
    'destinationLocation.id': location._doc._id
  }, {
    $set: {
      'destinationLocation': s
    }
  }, {
    multi: true
  }, function (err, updated) {
    if (err) {
      logger.error('Error attempting to update voucher.branch with updated branch information: ' + err);
      //  return next(err);
    }

    logger.info('Voucher Branch Updated ' + updated + ' voucher with updated branch information');
  });
});

// mongoose.model('Customer', CustomerSchema);
module.exports = BranchSchema; // mongoose.models.Customer