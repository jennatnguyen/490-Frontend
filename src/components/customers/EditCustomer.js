import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import "./Customers.css"; // Use existing styles for consistency

function EditCustomer({ selectedCustId, onClose, onCustomerUpdated }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch customer details when selectedCustomerId changes
  useEffect(() => {
    const fetchCustomer = async () => {
      if (!selectedCustId) return;

      try {
        const response = await axios.get(`/customerDetails2?id=${selectedCustId}`);
        console.log("Fetched customer details:", response.data);

        if (response.data.customer_details?.length > 0) {
          const customer = response.data.customer_details[0];
          setFormData({
            first_name: customer.first_name || "",
            last_name: customer.last_name || "",
            email: customer.email || "",
          });
        } else {
          setError("Customer not found.");
        }
      } catch (err) {
        console.error("Error fetching customer details:", err);
        setError("Failed to load customer details.");
      }
    };

    fetchCustomer();
  }, [selectedCustId]);

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
      const response = await axios.put(`/editCustomer/${selectedCustId}`, formData);

      console.log("Edit success:", response.data);

      if (!response.data || response.data.error) {
        throw new Error(response.data?.error || "Unexpected response format.");
      }

      if (onCustomerUpdated) {
        onCustomerUpdated(response.data);
      }

      onClose();
    } catch (err) {
      console.error("Error response:", err.response);
      setError(err.response?.data?.error || "Failed to edit customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="cust-details-box2 slide-up">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Edit Customer</h2>

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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default EditCustomer;
