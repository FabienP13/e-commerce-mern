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
        const { userId, addressId, street, city, zipcode, country } = req.body;

        //Updated datas
        const updatedData = {
            street,
            city,
            zipcode,
            country
        }

        // Checking user exists or not
        const addressExist = await addressModel.findById(addressId);

        if (addressExist) {
            //Update user data in database
            const updatedAddress = await addressModel.findByIdAndUpdate(
                addressId,
                { $set: updatedData },
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
        const { userId, selectedAddress } = req.body;

        // Checking user exists or not
        const addressExist = await addressModel.findById(selectedAddress._id);

        if (addressExist) {
            //Update user data in database
            const updatedAddress = await addressModel.findByIdAndUpdate(
                selectedAddress._id,
                { $set: selectedAddress },
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