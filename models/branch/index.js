var mongoose = require('mongoose');

var logger = require('../../config/logger');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BranchSchema = new Schema({
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


BranchSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at)
    this.stats.created_at = currentDate;
  next();
});
BranchSchema.post('findOneAndUpdate', function (branch) {
  var Voucher = global.ActiveClientMongooseConnection.models['Voucher'];
  //save every detail table
  if (!branch) return true ;
  var s = {
    id: branch._doc._id,
    name: branch._doc.name,
    //description: voucher.description
  };
  Voucher.update({
    'branch.id': branch._doc._id
  }, {
    $set: {
      "branch": s
    }
  }, {
    multi: true
  }, function (err, updated) {
    if (err) {
      logger.error('Error attempting to update voucher.branch with updated branch information: ' + err);
      return next(err);
    }

    logger.info('Voucher Branch Updated ' + updated + ' voucher with updated branch information');
  });

});


//mongoose.model('Customer', CustomerSchema);
module.exports = BranchSchema; //mongoose.models.Customer