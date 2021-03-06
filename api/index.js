'use strict';
var apiHandlers = {
    users: './users',
    customer: './customer',
    coa: './coa',
    branch: './branch',
    voucher: './voucher',
    vehicleOwner: './vehicleOwner',
    vehicleTransaction: './vehicleTransaction',
    transactionType: './transactionType',

};
module.exports = {
    initialize: function (server) {
        Object.keys(apiHandlers).forEach(function (key) {
            server.use('/api/' + key, require(apiHandlers[key]));
        });
    }
};