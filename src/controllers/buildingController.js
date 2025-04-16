import { Building, Unit } from "../models/building.js";
import User from "../models/users.js";

export const createBuildings = async (req, res) => {
  try {
    const {
      name,
      address,
      description,
      constructionYear,
      images
    } = req.body;

    // Fix here: find an owner user
    const owner = await User.findOne({ role: "Owner" });

    if (!owner) {
      return res.status(404).json({ success: false, message: "No owner found in the system." });
    }

    const newBuilding = new Building({
      owner: owner._id,
      name,
      address,
      description,
      constructionYear,
      images
    });

    await newBuilding.save();
    res.status(201).json({
      success: true,
      message: "Building created successfully",
      building: newBuilding
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating building",
      error: error.message
    });
  }
};
export const buildingDetails = async (req, res) => {
  try {
    const { building } = req.body;

    const buildingData = await Building.findOne({ name: building })
      .populate({ path: 'owner', select: 'name' }) // only owner's name
      .populate('units'); // virtual populate

    res.status(200).json({
      success: true,
      building: buildingData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching building details',
      error: error.message,
    });
  }
};


export const createBuildingUnits = async (req, res) => {
  try {
    console.log("adskasd");
    // Extracting fields from request body
    const {
      building,      // Building name instead of ObjectId
      unitType,      // Type of unit (FamilyRoom, BachelorRoom, ShopRoom, Godown, HallSpace)
      unitNumber,    // Unique identifier for the unit within the building
      floor,         // Floor number where the unit is located
      size,          // Size of the unit in square feet
      rent,          // Monthly rental amount
      status,        // Current occupancy status (Vacant or Occupied)
      bedrooms,      // Number of bedrooms (optional - default depends on unitType)
      specialFeature, // Special feature (optional - default depends on unitType)
      images         // Array of image URLs (optional)
    } = req.body;

    // Check if building exists - fixed syntax error
    const buildingExists = await Building.findOne({ name: building });
    if (!buildingExists) {
      return res.status(400).json({ message: 'Building not found' });
    }
    
    // Check if unit number already exists in this building
    const existingUnit = await Unit.findOne({ 
      building: buildingExists._id, // Use building ID here
      unitNumber 
    });
    
    if (existingUnit) {
      return res.status(400).json({ 
        message: 'Unit number already exists in this building' 
      });
    }
    
    // Create new unit - fixed object syntax
    const unit = new Unit({
      building: buildingExists._id, // Assign building ID correctly
      unitType,
      unitNumber,
      floor,
      size,
      rent,
      status: status || 'Vacant', // Default to Vacant if not provided
      bedrooms,
      specialFeature,
      images: images || []
    });
    
    const savedUnit = await unit.save();
    
    res.status(201).json({
      success: true,
      data: savedUnit,
      message: 'Unit created successfully'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: 'Error creating unit', 
      error: error.message 
    });
  }
};