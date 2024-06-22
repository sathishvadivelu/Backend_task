import mongoose from "mongoose";
import { type } from "os";
const { Schema } = mongoose;

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (v) {
        // Simple regex for email validation
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        // Regex to validate phone number with optional leading + and any country code
        return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number with country code (e.g., +91 8525825116)`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dob: {
    type: String,
    required: [true, "Date of birth is required"],
    validate: {
      validator: function (v) {
        // Check for valid date format YYYY-MM-DD
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid date of birth (YYYY-MM-DD)`,
    },
  },
  bankAccountNo: {
    type: Number,
    required: [true, "Bank account number is required"],
    validate: {
      validator: function (v) {
        // Ensure bank account number is at least 6 digits long (adjust as needed)
        return /^\d{6,}$/.test(v.toString());
      },
      message: (props) => `${props.value} is not a valid bank account number`,
    },
  },
  profileImage: {
    type: String,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
