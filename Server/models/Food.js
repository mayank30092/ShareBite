import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    type: { type: String, enum: ["veg", "non-veg"], required: true },
    expiryDate: { type: Date },

    pickupLocation: { type: String, required:true },

    latitude:{type:Number},
    longitude:{type: Number},

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere", // Geospatial index
      }
    },
    
    image: { type: String },
    imagePublicId: { type: String },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    status: { type: String, enum: ["available", "claimed", "expired"], default: "available" },

    claimedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", default:null,},
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
