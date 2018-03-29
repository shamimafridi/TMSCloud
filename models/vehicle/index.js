var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var VehicleSchema = new Schema({
  vehicle_reg_no: {
    type: String,
    unique: true,
    required: true
  },

  desc: {
    type: String
  },
  vehicle_owner: {
    id: {
      type: ObjectId,
      ref: 'VehicleOwner'
    },
    name: {
      type: String
    }
  },

  freight_coa: {
    id: {
      type: ObjectId,
      ref: 'COA'
    },
    name: {
      type: String
    }
  },
  commission_coa: {
    id: {
      type: ObjectId,
      ref: 'COA'
    },
    name: {
      type: String
    }
  },
  shortage_coa: {
    id: {
      type: ObjectId,
      ref: 'COA'
    },
    name: {
      type: String
    }
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

VehicleSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at) { this.stats.created_at = currentDate; }
  next();
});

// mongoose.model('Customer', CustomerSchema);
module.exports = VehicleSchema; // mongoose.models.Customer
