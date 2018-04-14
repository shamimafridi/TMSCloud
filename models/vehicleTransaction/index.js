var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var VehicleTransactionSchema = new Schema({
  branch: {
    id: {
      required: true,
      type: ObjectId,
      ref: 'Branch'
    },
    name: {
      type: String

    }
  },
  type: {
    id: {
      required: true,
      type: ObjectId,
      index: true,
      ref: 'VehicleTransactionType'
    },
    transactionNature: {
      type: String
    },
    name: {
      type: String

    }
  },
  vehicle_reg_no: String,
  instrumental_type: String, // cheque or chash
  desc: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  amount:Number,// amount for trip transaction
  invoice_token_no: String,
  
  stationLocation:{
    id: {
      type: ObjectId,
      ref: 'Location'
    },
    destinationLocation:{
      id: {
        type: ObjectId,
        ref: 'Location'
      },
  transaction_detail: [{
    coa: {
      id: {
        index: true,
        require: true,
        type: ObjectId,
        ref: 'COA'
      },
      name: {
        type: String
      }
    },    
    amount: Number,
    narration: String
  }],
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

VehicleTransactionSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at) {
    this.stats.created_at = currentDate;
  }
  next();
});

// mongoose.model('Customer', CustomerSchema);
module.exports = VehicleTransactionSchema; // mongoose.models.Customer