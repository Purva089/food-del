import express from 'express';
import {loginAdmin,registerAdmin} from '../controllers/adminController.js';
const adminRouter = express.Router();

adminRouter.post("/adminRegister",registerAdmin);
adminRouter.post("/adminLogin",loginAdmin);

export default adminRouter;