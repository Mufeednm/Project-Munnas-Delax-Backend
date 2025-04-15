import express from 'express';
import { createBuildings } from '../controllers/buildingController';


const router = express.Router();

router.post('/', createBuildings);      
// router.get('/', getAllUsers);         // GET /api/users
// router.get('/:id', getUserById);      // GET /api/users/:id
// router.put('/:id', updateUser);       // PUT /api/users/:id
// router.delete('/:id', deleteUser);    // DELETE /api/users/:id

export default router;
