import express from 'express';
import {  buildingDetails, buildings, createBuildingUnits, createBuildings, vaccuntUnits } from '../controllers/buildingController.js';


const router = express.Router();

// router.post('/units', createBuildingUnits);      
router.post('/', createBuildings);  
router.get('/', buildings);  
router.post('/details', buildingDetails);  
router.post('/units', createBuildingUnits);    
router.get('/units/vaccunt', vaccuntUnits);    
// router.get('/', getAllUsers);         // GET /api/users
// router.get('/:id', getUserById);      // GET /api/users/:id
// router.put('/:id', updateUser);       // PUT /api/users/:id
// router.delete('/:id', deleteUser);    // DELETE /api/users/:id

export default router;
