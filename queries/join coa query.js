db.getCollection('coas').aggregate([
    {
      $lookup:
        {
          from: "coas",
          localField: "parent_path",
          foreignField: "_id",
          as: "Parents"
        }
   }
])