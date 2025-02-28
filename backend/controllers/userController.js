import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import userModel from '../models/userModel.js';
import stripe from '../service/stripe.js'
import mongoose from "mongoose";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


//Route for getting user data

const getUser = async (req,res) => {
    try {
        const { userId } = req.body 
        const user = await userModel.findById(userId)
        
        res.json({ success: true, user })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Route for user login
const loginUser = async (req,res) => {
    try {
        
        const {email,password} = req.body;

        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            
            const token = createToken(user._id)
            res.json({success: true, token})
        } else {
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

//Route for user registration
const registerUser = async (req,res) => {
    try {
        const {name, email, password } = req.body;

        // Checking user already exists or not
        const exists = await userModel.findOne({email});

        if (exists) {
            return res.json({success:false, message:"User already exists"})
        }

        // Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email."})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong email."})
        }


        //Generate custom ObjectId
        const customId = new mongoose.Types.ObjectId();

        //Creating stripe customer 
        const stripeCustomer = await stripe.customers.create({
            name: name,
            email: email,
            metadata: {
                user_id: customId.toString(),
              }
          });
        
        //Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser =  new userModel({
            _id: customId,
            name,
            email,
            password: hashedPassword,
            stripeCustomerId: stripeCustomer.id
        })

        
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

//Route admin Login
const adminLogin = async (req,res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true, token})
        } else {
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

export { getUser,loginUser, registerUser, adminLogin};