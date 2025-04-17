import mongoose from 'mongoose';

const RentHistorySchema = new mongoose.Schema({
  amount: Number,
  date: { type: Date, default: Date.now },
  description: String, // e.g., "Advance", "Monthly Rent", "Partial Payment"
}, { _id: false });

const TenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  proofType: {
    type: String,
    required: true
  },
  proofId: {
    type: String,
    required: true
  },
  address: {
   
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
  },
  contact: {
    type: String,
    required: true
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  rentAmount: {
    type: Number, // monthly rent (fetched from unit)
    required: true
  },
  advancePaid: {
    type: Number,
    required: true
  },
  dueAmount: {
    type: Number,
    default: 0
  },
  moveOutDate: {  // Added move-out date
    type: Date,
    default: null
  },
  rentHistory: [RentHistorySchema]
});

const Tenant = mongoose.model('Tenant', TenantSchema);

export default Tenant;
