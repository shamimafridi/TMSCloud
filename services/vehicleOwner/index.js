'use strict';
//var VehicleOwner;

function VehicleOwnerService(model_ctx) {
  //VehicleOwner = model_ctx;
}

module.exports = VehicleOwnerService;

VehicleOwnerService.prototype.VehicleOwner;

VehicleOwnerService.prototype.GetById = function(id) {
  return VehicleOwner.findById(
    {
      _id: id,
      'stats.deleted': false,
    },
    {
      __v: 0,
      'stats.deleted': 0,
      'stats.updated_by': 0,
    }
  ).exec();
};

VehicleOwnerService.prototype.GetByQuery = function(query) {
  if (query) return VehicleOwner.find(query).exec();

  return VehicleOwner.find(
    {
      'stats.deleted': false,
    },
    {
      __v: 0,
      'stats.deleted': 0,
      'stats.updated_by': 0,
    }
  ).exec();
};

VehicleOwnerService.prototype.Create = function(model) {
  var owner = new this.VehicleOwner(); //global.ActiveClientMongooseConnection.models['VehicleOwner'];
  owner.name = model.name;
  owner.phoneNo = model.phoneNo;
  owner.address = model.address;
  return owner.save();
};

VehicleOwnerService.prototype.Update = function(id, model) {
  return VehicleOwner.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: model,
    },
    {
      new: true,
    }
  ).exec();
};

VehicleOwnerService.prototype.MarkAsDelete = function(id) {
  return VehicleOwner.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        'stats.deleted': true,
      },
    }
  ).exec();
};
