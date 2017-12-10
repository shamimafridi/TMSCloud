var mongoose  = require('mongoose'); 
var Schema       = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var VehicleOwnerSchema   = new Schema({
    name: String,
    phoneNo:String,
    address:{
      address1:String,
      address2:String,
      city:String,
      country:String
    },
    stats :{
    	created_at : { type: Date},
    	updated_at: { type: Date},
    	
    	created_by : { type: String },
    	updated_by: { type: String },
    	deleted: {type:Boolean, default: false}
    }
});


VehicleOwnerSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.stats.updated_at = currentDate;
  this.stats.created_by = '1';
  this.stats.updated_by = '1';
  if (!this.stats.created_at)
    this.stats.created_at = currentDate;
  	next();
});

//mongoose.model('VehicleOwner', VehicleOwnerSchema);
module.exports = VehicleOwnerSchema;//mongoose.models.VehicleOwner