import mongoose from "mongoose";
const rentSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tenant:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  amount:Number,
  status:{
    type:String,
    default:'pending'//pending,paid,cancelled
  },
  startDate: {
    type: String,
  },
  ts:Date,
  mt:Date
});

const Tenant =
  mongoose.models.rents || mongoose.model("rents", rentSchema);

export default Tenant;
