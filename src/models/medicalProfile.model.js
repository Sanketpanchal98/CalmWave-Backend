import mongoose from 'mongoose'

const MedicalProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  baselines: {
    restingHeartRate: { type: Number, default: 72 }, 
    averageHRV: { type: Number, default: 40 },      
    averageTemp: { type: Number, default: 36.5 }    
  },

  hasTrauma: { 
    type: Boolean, 
    default: false 
  },
  
  stressLevelSelfReport: { 
    type: Number, 
    min: 1, 
    max: 10, 
    default: 5 
  },

  panicAttackFrequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'],
    default: 'Never'
  },

  locationTriggers: [{ 
    type: String, 
    trim: true 
  }], 
  
  geoTriggers: [{
    name: String,
    latitude: Number,
    longitude: Number,
    radius: Number,
    riskWeight: { type: Number, default: 0.5 } 
  }],

  activeHours: [{
    start: String, 
    end: String,  
    riskWeight: { type: Number, default: 0.3 }
  }],

  primarySymptoms: [{
    type: String,
    enum: ['Palpitations', 'Sweating', 'Cold Hands', 'Trembling', 'Shortness of Breath']
  }],

  emergencyContact: {
    name: String,
    phone: String
  }
}, { timestamps: true });

export const MedicalProfile = mongoose.model('MedicalProfile', MedicalProfileSchema);