var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var VocherSchema = new Schema({
  branch: {
    required: true,
    type: ObjectId,
    ref: 'Branch'
  },
  date: {
    type: Date,
    required: true
  },
  desc: String,
  voucher_detail: [{
      coa: {
        index:true,
        require: true,
        type: ObjectId,
        ref: 'COA'
      },
      reference: String,
      debit: Number,
      credit: Number,

      narration: String
    }

  ],
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


VocherSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at)
    this.stats.created_at = currentDate;
  next();
});

//mongoose.model('Customer', CustomerSchema);
module.exports = VocherSchema; //mongoose.models.Customer