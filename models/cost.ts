import mongoose from "mongoose";
const costSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  property:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  date: String,
  amount: Number,
  note: String,
  tp: Number,//1: water 2:electricity 3:gas 4:internet 5:other
});

const Cost =
  mongoose.models.costs || mongoose.model("costs", costSchema);

export default Cost;

