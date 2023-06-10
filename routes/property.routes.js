import express from "express";

import { getAllProperties, createProperty, getPropertyDetail, updateProperty, deleteProperty } from "../controllers/property.controller.js";

const router = express.Router();

router.get('/', getAllProperties);
router.post('/', createProperty);
router.get('/:id', getPropertyDetail);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;