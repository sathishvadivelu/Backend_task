// routes/customerRoutes.js
import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/customers", createCustomer);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.put("/customers/:id", updateCustomerById);
router.delete("/customers/:id", deleteCustomerById);

export default router;
