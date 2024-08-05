import mongoose from "mongoose";
const tenantSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
  },
  deposit: Number,
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  isCurrent: Boolean
});

const Tenant =
  mongoose.models.tenants || mongoose.model("tenants", tenantSchema);

export default Tenant;

