import addressModel from '../models/addressModel.js';


const getAddressByUserId = async (req,res) => {
    try {
        const { userId } = req.body 
        const userAddress = await addressModel.findOne(userId)
        
        res.json({ success: true, userAddress })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getAllAddressesByUserId = async (req,res) => {

}

const addAddress = async (req,res) => {


}

const updateAddress = async (req,res) => {

}

const deleteAddress = async (req,res) => {

}

export {getAddressByUserId,getAllAddressesByUserId,addAddress,updateAddress,deleteAddress};