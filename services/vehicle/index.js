'use strict';
//var Vehicle; 

function VehicleService(model_ctx) {
    //Vehicle = model_ctx;
}

module.exports = VehicleService;

VehicleService.prototype.Vehicle

VehicleService.prototype.GetById = function (id) {
    return Vehicle.findById({
        _id: id,
        'stats.deleted': false
    }, {
        '__v': 0,
        'stats.deleted': 0,
        'stats.updated_by': 0,
    }).exec();
};

VehicleService.prototype.GetByQuery = function (query) {
    //var Vehicle = new this.Vehicle(); 
    var Vehicle=  global.ActiveClientMongooseConnection.models['Vehicle'];
    if (query)
        return Vehicle.find(query).exec();

    return Vehicle.find({
        'stats.deleted': false
    }, {
        '__v': 0,
        'stats.deleted': 0,
        'stats.updated_by': 0,
    }).exec();
};

VehicleService.prototype.Create = function (model) {
    var vehicle = new this.Vehicle(); //global.ActiveClientMongooseConnection.models['Vehicle'];    
    
    vehicle.desc=model.desc;
    vehcile.vehicle_owner=model.vehicle_owner;
    vehicle.freight_coa=model.freight_coa;
    vehicle.commission_coa=model.commission_coa;
    vehicle.shortage_coa=model.shortage_coa;    
    return vehicle.save();
};

VehicleService.prototype.Update = function (id, model) {
    var Vehicle = global.ActiveClientMongooseConnection.models['Vehicle'];
    return Vehicle.findOneAndUpdate({
        _id: id
    }, {
        $set: model
    }, {
        new: true
    }).exec();
};

VehicleService.prototype.MarkAsDelete = function (id) {
    return Vehicle.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            'stats.deleted': true
        }
    }).exec();
};