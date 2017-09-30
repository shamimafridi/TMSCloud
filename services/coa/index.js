'use strict';
//var COA; 

function COAService(model_ctx) {
    //COA = model_ctx;
}

module.exports = COAService;

COAService.prototype.COA

COAService.prototype.GetById = function (id) {
    return COA.findById({
        _id: id,
        'stats.deleted': false
    }, {
        '__v': 0,
        'stats.deleted': 0,
        'stats.updated_by': 0,
    }).exec();
};

COAService.prototype.GetByQuery = function (query) {
    //var COA = new this.COA(); 
    var COA=  global.ActiveClientMongooseConnection.models['COA'];
    if (query)
        return COA.find(query).exec();

    return COA.find({
        'stats.deleted': false
    }, {
        '__v': 0,
        'stats.deleted': 0,
        'stats.updated_by': 0,
    }).exec();
};

COAService.prototype.Create = function (model) {
    var COA = new this.COA(); //global.ActiveClientMongooseConnection.models['COA'];    
    COA.name = model.name;
    COA.desc = model.desc;
    COA.parent = model.parent
    
    return COA.save();
};

COAService.prototype.Update = function (id, model) {
    var COA = global.ActiveClientMongooseConnection.models['COA'];
    return COA.findOneAndUpdate({
        _id: id
    }, {
        $set: model
    }, {
        new: true
    }).exec();
};

COAService.prototype.MarkAsDelete = function (id) {
    return COA.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            'stats.deleted': true
        }
    }).exec();
};