
import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'
import stripe from '../service/stripe.js'
import mongoose from "mongoose";

// Function for add product 

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { ressource_type: 'image' })
                return result.secure_url
            })
        )

        //Generate custom ObjectId
        const customId = new mongoose.Types.ObjectId();

        //Creating Stripe product
        const stripeProduct = {
            currency: 'eur',
            unit_amount_decimal: Number(price)*100,
            product_data: {
                name: name,
                metadata: {
                    product_id: customId.toString(),
                    description: description,
                    bestseller: bestseller === "true" ? true : false,
                }
            }
        }
        
        const stripePrice = await stripe.prices.create(stripeProduct)

        const productData = {
            _id: customId,
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
            stripePriceId: stripePrice.id,
            stripeProductId: stripePrice.product
        }
        
        const product = new productModel(productData)
        
        await product.save();

        res.json({ success: true, message: "Product Added !" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}


// Function for list product 

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Function for removing product 

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed !" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Function for single product info

const singleProduct = async (req, res) => {

    try {
        const singleProduct = await productModel.findById(req.body.id)

        res.json({ success: true, singleProduct })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addProduct, listProducts, removeProduct, singleProduct };