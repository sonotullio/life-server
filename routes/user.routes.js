import express from "express";

import { createUser, updateUser, getAllUsers, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.get('/:id', getUserById);

export default router;