import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
  },
  tp: {
    type: String
  }
});

const Room = mongoose.models.rooms || mongoose.model("rooms", roomSchema);

export default Room;
