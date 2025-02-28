import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, default: new mongoose.Types.ObjectId()},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    stripeCustomerId: {type: String, required: false}

}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel;