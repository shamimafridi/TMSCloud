'use strict';
var models = {
    Customer: './customer',
    COA: './coa',
    Branch: './branch',
    Voucher: './voucher',
    Vehicle: './vehicle',
    VehicleOwner: './vehicleOwner'
    
    
};

module.exports = {
    initialize: function (ctx) {
        Object.keys(models).forEach(function (key) {
        	ctx.model(key, require('./'+ models[key]));
        	
        });
    }
};