
import mongoose from "mongoose"

//schema for review
export const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  rating: Number,
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  propertyId: {type: String}
})

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ["beach", "cabin", "camping", "city", "chalet", "country"], required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date_start: { type: Date, },
  date_end: { type: Date, },
  amenities: String,
  longitude: Number,
  latitude: Number,
  images: [],
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: String },
})

export default mongoose.model("Property", propertySchema)