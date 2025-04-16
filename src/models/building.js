import mongoose from 'mongoose';

// --- Building Schema ---
const BuildingSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  description: String,
  constructionYear: Number,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🛠️ Virtual populate
BuildingSchema.virtual('units', {
  ref: 'Unit',
  localField: '_id',
  foreignField: 'building'
});

// Enable virtuals in JSON and Object output
BuildingSchema.set('toObject', { virtuals: true });
BuildingSchema.set('toJSON', { virtuals: true });

const Building = mongoose.model('Building', BuildingSchema);

// --- Unit Schema ---
const UnitSchema = new mongoose.Schema({
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
    required: true
  },
  unitType: {
    type: String,
    enum: ['FamilyRoom', 'BachelorRoom', 'ShopRoom', 'Godown', 'HallSpace'],
    required: true
  },
  unitNumber: {
    type: String,
    required: true
  },
  floor: Number,
  size: Number,
  rent: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Vacant', 'Occupied'],
    default: 'Vacant'
  },
  bedrooms: {
    type: Number,
    default: function () {
      if (this.unitType === 'FamilyRoom') return 2;
      if (this.unitType === 'BachelorRoom') return 1;
      return 0;
    }
  },
  specialFeature: {
    type: String,
    enum: ['Balcony', 'Street Facing', 'Storage Area'],
    default: function () {
      if (this.unitType === 'ShopRoom') return 'Street Facing';
      if (this.unitType === 'FamilyRoom') return 'Balcony';
      if (this.unitType === 'Godown') return 'Storage Area';
      return null;
    }
  },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

const Unit = mongoose.model('Unit', UnitSchema);

// ✅ Export both using named export
export { Building, Unit };
