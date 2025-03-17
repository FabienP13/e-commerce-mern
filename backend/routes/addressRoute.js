import express from 'express'
import authUser from '../middleware/auth.js';
import { addAddress, getAddressByUserId, putAddressActive, updateAddress} from '../controllers/addressController.js'


const addressRouter = express.Router();


addressRouter.post('/active',authUser, getAddressByUserId);
addressRouter.patch('/is-active',authUser, putAddressActive);
addressRouter.patch('/update',authUser, updateAddress);
addressRouter.post('/add',authUser, addAddress);


export default addressRouter;