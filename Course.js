 
 const mongoose =require("mongoose");

 const courseSchema =new mongoose.Schema(
    {
    name:{type: String, require:true},
    code: { type: String, require: true },
    description: { type: String },
    teacher: { type: String }

    },
    {timestamps:true}
 );

module.exports =mongoose.model('Course', courseSchema);