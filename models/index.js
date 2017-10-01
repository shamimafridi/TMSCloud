'use strict';
var models = {
    Customer: './customer',
    COA: './coa',
    Branch: './branch',
    Voucher: './voucher'
};

module.exports = {
    initialize: function (ctx) {
        Object.keys(models).forEach(function (key) {
        	ctx.model(key, require('./'+ models[key]));
        	
        });
    }
};