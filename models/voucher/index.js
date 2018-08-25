var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var VocherSchema = new Schema({
  branch: {
    id: {
      required: true,
      type: ObjectId,
      ref: 'Branch',
    },
    name: {
      type: String,
    },
  },
  desc: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  voucher_detail: [
    {
      coa: {
        id: {
          index: true,
          unique: true,
          require: true,
          type: ObjectId,
          ref: 'COA',
        },
        name: {
          type: String,
        },
      },
      reference: String,
      debit: Number,
      credit: Number,
      narration: String,
    },
  ],
  stats: {
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },

    created_by: {
      type: String,
    },
    updated_by: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
});

VocherSchema.pre('save', function(next) {
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

VocherSchema.plugin(mongoosePaginate);
mongoose.model('Voucher', VocherSchema);
module.exports = VocherSchema;
