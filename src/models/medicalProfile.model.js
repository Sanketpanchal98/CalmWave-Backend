import mongoose from 'mongoose'

const MedicalProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  hasTrauma: {
    type: Boolean,
    default: false
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
    radius: Number 
  }],

  emergencyContact: {
    name: String,
    phone: String
  }
}, { timestamps: true }); 

module.exports = mongoose.model('MedicalProfile', MedicalProfileSchema);