import express from 'express';
const router = express.Router();
//CONTROLLERS
import * as authCtrl from '../controllers/device/auth.ctrl';

router.get('/signIn', authCtrl.signIn);

export const deviceRoutes = router;