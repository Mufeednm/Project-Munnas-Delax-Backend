import express from 'express';
import {  buildingDetails, createBuildingUnits, createBuildings } from '../controllers/buildingController.js';


const router = express.Router();

// router.post('/units', createBuildingUnits);      
router.post('/', createBuildings);  
router.get('/', buildingDetails);  
router.post('/units', createBuildingUnits);    
// router.get('/', getAllUsers);         // GET /api/users
// router.get('/:id', getUserById);      // GET /api/users/:id
// router.put('/:id', updateUser);       // PUT /api/users/:id
// router.delete('/:id', deleteUser);    // DELETE /api/users/:id

export default router;
