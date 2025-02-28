import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, default: new mongoose.Types.ObjectId()},
    name: {type: String, required:true},
    description: {type: String, required:true},
    price: {type: Number, required:true},
    image: {type: Array, required:true},
    category: {type: String, required:true},
    subCategory: {type: String, required:true},
    sizes: {type: Array, required:true},
    bestseller: {type: Boolean},
    date: {type: Number, required:true},
    stripePriceId: {type: String, required: false},
    stripeProductId: {type: String, required: false}
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel;