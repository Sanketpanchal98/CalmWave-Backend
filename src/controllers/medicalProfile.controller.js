import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from '../utils/errorHandler.js';
import responseHandler from '../utils/responseHandler.js';
import { MedicalProfile } from "../models/medicalProfile.model.js";


const createOrUpdateMedicalProfile = asyncHandler(async (req, res) => {
    
    const { 
        baselines, 
        hasTrauma, 
        stressLevelSelfReport, 
        panicAttackFrequency, 
        locationTriggers, 
        geoTriggers, 
        activeHours, 
        primarySymptoms, 
        emergencyContact 
    } = req.body;


    const profile = await MedicalProfile.findOneAndUpdate(
        { user: req.user._id }, 
        {
            $set: {
                baselines,
                hasTrauma,
                stressLevelSelfReport,
                panicAttackFrequency,
                locationTriggers,
                geoTriggers,
                activeHours,
                primarySymptoms,
                emergencyContact
            }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!profile) {
        throw new errorHandler(500, "Error while updating medical profile");
    }

    res.status(200).json(
        new responseHandler(200, profile, "Medical profile updated successfully")
    );
});


const getMedicalProfile = asyncHandler(async (req, res) => {
    
    const profile = await MedicalProfile.findOne({ user: req.user._id });

    if (!profile) {
        throw new errorHandler(404, "Medical profile not found");
    }

    res.status(200).json(
        new responseHandler(200, profile, "Medical profile fetched successfully")
    );
});

export {
    createOrUpdateMedicalProfile,
    getMedicalProfile
};