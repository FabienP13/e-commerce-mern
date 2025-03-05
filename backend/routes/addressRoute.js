import express from 'express'
import authUser from '../middleware/auth.js';
import { getAddressByUserId} from '../controllers/addressController.js'


const addressRouter = express.Router();


addressRouter.post('/active', getAddressByUserId); //authUser,


export default addressRouter;