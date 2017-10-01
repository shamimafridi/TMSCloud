'use strict';
//var Branch; 

function BranchService(model_ctx) {
    //Branch = model_ctx;
}

module.exports = BranchService;

BranchService.prototype.Branch

BranchService.prototype.GetById = function (id) {
    return Branch.findById({
        _id: id,
        'stats.deleted': false
    }, {
        '__v': 0,
        'stats.deleted': 0,
        'stats.updated_by': 0,
    }).exec();
};

BranchService.prototype.GetByQuery = function (query) {
    //var Branch = new this.Branch(); 
    var Branch=  global.ActiveClientMongooseConnection.models['Branch'];
    if (query)
        return Branch.find(query).exec();

    return Branch.find({
        'stats.deleted': false
    }, {
        '__v': 0,
        'stats.deleted': 0,
        'stats.updated_by': 0,
    }).exec();
};

BranchService.prototype.Create = function (model) {
    var Branch = new this.Branch(); //global.ActiveClientMongooseConnection.models['Branch'];    
    Branch.name = model.name;
    
    return Branch.save();
};

BranchService.prototype.Update = function (id, model) {
    var Branch = global.ActiveClientMongooseConnection.models['Branch'];
    return Branch.findOneAndUpdate({
        _id: id
    }, {
        $set: model
    }, {
        new: true
    }).exec();
};

BranchService.prototype.MarkAsDelete = function (id) {
    return Branch.findOneAndUpdate({
        _id: id
    }, {
        $set: {
            'stats.deleted': true
        }
    }).exec();
};