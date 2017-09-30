var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var COASchema = new Schema({
  name: {
    type: String,
    unique:true,
    required: true
  },
  desc: {
    type: String
  },
  //SEE THE PATTREN https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-ancestors-array/
  parent_path: {
    type: Array,
    index: true
  },
  parent: {
    type: String,
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


COASchema.pre('save', function (next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at)
    this.stats.created_at = currentDate;
  next();
});

//mongoose.model('COA', COASchema);
module.exports = COASchema; //mongoose.models.COA