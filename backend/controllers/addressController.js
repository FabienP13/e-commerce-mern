import addressModel from '../models/addressModel.js';


const getAddressByUserId = async (req,res) => {
    try {
        const { userId } = req.body 
        const userAddress = await addressModel.find({userId})
        
        res.json({ success: true, userAddress })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getAllAddressesByUserId = async (req,res) => {

}

const addAddress = async (req, res) => {

    try {
        //Creating new address for this user
        const { formData, userId } = req.body 

        const newAddress = new addressModel({
            userId: userId,
            street: formData.street,
            city: formData.city,
            zipcode: formData.zipcode,
            country: formData.country,
            isActive: false
        })

        const address = await newAddress.save()

        res.json({ success: true, message: "Address has been added !" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const putAddressActive = async (req,res) => {
    try {
        const { addressId, userId } = req.body 

        await addressModel.updateMany({ userId }, { isActive: false });

        const addressUpdated = await addressModel.findByIdAndUpdate(addressId, { isActive: true })

        res.json({ success: true, addressUpdated })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateAddress = async (req,res) => {
    try {
        const { userId, formData } = req.body;
        
        // Checking user exists or not
        const addressExist = await addressModel.findById(formData._id);

        if (addressExist) {
            //Update user data in database
            const updatedAddress = await addressModel.findByIdAndUpdate(
                formData._id,
                { $set: formData },
                { new: true }
            );
            if (updatedAddress) {
                res.json({ success: true, message: "Address has been updated !" })
            }
        } else {
            return res.json({ success: false, message: 'Address doesn\'t exist' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const deleteAddress = async (req,res) => {

}

export {getAddressByUserId,getAllAddressesByUserId,addAddress,updateAddress,deleteAddress,putAddressActive};