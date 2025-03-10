import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import "./Customers.css"; // Use existing styles for consistency

function AddCustomer({ onClose, onCustomerAdded }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/addCustomer", formData);

      console.log("Success:", response.data); // Log response for debugging

      if (!response.data || response.data.error) {
        throw new Error(response.data?.error || "Unexpected response format.");
      }

      if (onCustomerAdded) {
        onCustomerAdded(response.data);
      }

      onClose();
    } catch (err) {
      console.error("Error response:", err.response);
      console.error("Error message:", err.message);
      console.error("Full error object:", err);
      
      setError(err.response?.data?.message || "Failed to add customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset error when loading state changes
  useEffect(() => {
    if (!loading) {
      setError("");
    }
  }, [loading]);

  return (
    <div className="modal-overlay fade-in">
      <div className="cust-details-box2 slide-up">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add Customer</h2>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button 
            variant="contained"
            sx={{
              backgroundColor: "#E75480",
              color: "white",
              "&:hover": { backgroundColor: "#D14572" },
            }}
            onClick={handleSubmit} 
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Customer"}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default AddCustomer;
