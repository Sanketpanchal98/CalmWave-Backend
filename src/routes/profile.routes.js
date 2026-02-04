import { Router } from 'express';
import { createOrUpdateMedicalProfile, getMedicalProfile } from '../controllers/medicalProfile.controller.js';
import { getUserProfile } from '../controllers/user.controller.js';

const router = Router();

router.post('/addOrUpdate', createOrUpdateMedicalProfile);

router.get('/get', getMedicalProfile);

router.get('/get', getUserProfile);


export default router;