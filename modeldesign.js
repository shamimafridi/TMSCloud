var vehicleOwner={
    name:String,
    address:{
    
    },
    //vehicles:[{ type: Schema.Types.ObjectId, ref: 'Vehicles' }]
    
};
var vehicle={
    vehicle_no:String,
    vehicle_capacity:String,

}

var VehicleTrip={
    trip_no:String,
    trip_date:String,
    ref_no:String,
    vehicle_no:String,
    ownerName: { type: Schema.Types.ObjectId, ref: 'Owner' },
    quantity:Number,
    rate:Number
}
var COA={

    name:String,
    desc:String,
    account_type:{type:Schema.Types.ObjectId,ref:this}

}
