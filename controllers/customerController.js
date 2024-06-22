// controllers/customerController.js
import Customer from "../models/customer.js";
import upload from "../middleware/upload.js";

// Create a new customer
export const createCustomer = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("err11", err);
      return res.status(400).json({ error: err.message });
    }
    const { firstName, lastName, email, phone, dob, bankAccountNo } = req.body;
    const profileImage = req.file ? req.file.path : "";
    try {
      const newCustomer = new Customer({
        firstName,
        lastName,
        email,
        phone,
        dob,
        bankAccountNo,
        profileImage,
      });
      await newCustomer.save();
      res.status(201).json(newCustomer);
    } catch (error) {
      console.log("error", error);
      res.status(400).json({ error: error.message });
    }
  });
};

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a customer by ID
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a customer by ID
export const updateCustomerById = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    const profileImage = req.file ? req.file.path : "";
    try {
      const updatedData = {
        firstName,
        lastName,
        email,
        phone,
      };

      if (profileImage) {
        updatedData.profileImage = profileImage;
      }

      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      if (!updatedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

// Delete a customer by ID
export const deleteCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
