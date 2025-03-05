import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: { type: String, ref: "users", required: true},
    street: {type: String, required: true },
    city: {type: String, required: true },
    zipcode: {type: String, required: true },
    country: {type: String, required: true },
    isActive: {type: Boolean, required: false, default: false}
}, {timestamps: true})

const addressModel = mongoose.models.address || mongoose.model('address',addressSchema)

export default addressModel;