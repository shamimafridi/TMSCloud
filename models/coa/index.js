var mongoose = require('mongoose');
var logger = require('../../config/logger');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const mongooseTreeAncestors = require('mongoose-tree-ancestors'); //https://www.npmjs.com/package/mongoose-tree-ancestors
const modelName = 'coa';
var COASchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  desc: {
    type: String
  },
  //SEE THE PATTREN https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-ancestors-array/
  parent_path: {
    type: Schema.Types.Array,
    index: 1
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
mongooseTreeAncestors(COASchema, {
  // Set the parent field name and model reference
  parentFieldName: 'parent',
  parentFieldRefModel: modelName,

  // Set the ancestors field name and model reference
  ancestorsFieldName: 'parent_path',
  ancestorsFieldRefModel: modelName
});


COASchema.pre('save', function(next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at)
    this.stats.created_at = currentDate;
  	next();
});
COASchema.post('findOneAndUpdate', function(updatedData) {
  var Voucher =global.ActiveClientMongooseConnection.models['Voucher'];
 //save every detail table  
 if(!updatedData) return true;
  var coa = {
      id: updatedData._doc._id,
      name: updatedData._doc.name,
      //description: voucher.description
  };
  Voucher.update({'voucher_detail.coa.id': coa.id}, { "$set" : { "voucher_detail.$.coa" : coa } },{multi: true}, function(err, updated){
      if (err) {
        logger.error('Error attempting to update voucher.coa with updated branch information: '+err);
        throw err;
      }

      logger.info('Voucher COA Updated '+updated+' voucher with updated branch information');
  });
});
module.exports = COASchema; //mongoose.models.COA