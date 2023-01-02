import express from 'express';
const router = express.Router();
//CONTROLLERS
import * as authCtrl from './../controllers/admin/auth.ctrl';

router.get('/signIn', authCtrl.signIn);

export const adminRoutes = router;