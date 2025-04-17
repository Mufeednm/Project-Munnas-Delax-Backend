import { Unit } from "../models/building.js";
import Tenant from "../models/tenant.js";

export const createTenant = async (req, res) => {
  try {
    const {
      name,
      proofType,
      proofId,
      address,
      contact,
      unitId,
      advancePaid,
      joinedDate
    } = req.body;

    // Step 1: Check if unit exists
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    if (unit.status="Occupied") {
      return res.status(404).json({ success: false, message: 'Unit is all ready occupied found' });
    }

    // Step 2: Get rent amount from unit
    const rentAmount = unit.rent;


    // Step 3: Create tenant
    const tenant = new Tenant({
      name,
      proofType,
      proofId,
      address,
      contact,
      unit: unit._id,
      joinedDate,
      rentAmount,
      advancePaid,
      rentHistory: [
        {
          amount: advancePaid,
          description: 'Advance Payment (2 months)'
        }
      ]
    });

    await tenant.save();

    // Step 4: Optionally mark unit as occupied
    unit.status = 'Occupied';
    await unit.save();

    res.status(201).json({
      success: true,
      message: 'Tenant created successfully',
      tenant
    });

  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating tenant',
      error: error.message
    });
  }
};
