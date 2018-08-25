'use strict';
//var Voucher;

function VoucherService(model_ctx) {
  //Voucher = model_ctx;
}

module.exports = VoucherService;

VoucherService.prototype.Voucher;

VoucherService.prototype.GetById = function(id) {
  return Voucher.findById(
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
VoucherService.prototype.GetByQuery = function(query) {
  //var Voucher = new this.Voucher();
  var Voucher = global.ActiveClientMongooseConnection.models['Voucher'];
  console.log(query);
  console.log(query);
  //if (query) return Voucher.find(query).exec();

  return Voucher.paginate({}, { page: parseInt(query.page), limit: parseInt(query.limit) }, function(_err, result) {
    // result.docs
    // result.total
    // result.limit - 10
    // result.page - 3
    // result.pages
  });
  // return Voucher.find(
  //   {
  //     'stats.deleted': false,
  //   },
  //   {
  //     __v: 0,
  //     'stats.deleted': 0,
  //     'stats.updated_by': 0,
  //   }
  // ).exec();
};

VoucherService.prototype.Create = function(model) {
  var Voucher = new this.Voucher(); //global.ActiveClientMongooseConnection.models['Voucher'];
  Voucher.date = model.date;
  Voucher.desc = model.desc;
  Voucher.branch = model.branch;
  Voucher.voucher_detail = model.voucher_detail;

  return Voucher.save();
};

VoucherService.prototype.Update = function(id, model) {
  var Voucher = global.ActiveClientMongooseConnection.models['Voucher'];
  return Voucher.findOneAndUpdate(
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

VoucherService.prototype.MarkAsDelete = function(id) {
  return Voucher.findOneAndUpdate(
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
