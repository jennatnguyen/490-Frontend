import { useState, useEffect } from "react";
import './Customers.css';
import axios from "axios";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableContainer,
  Paper,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";
  
const CustomerDetails = ({ customerId, onClose }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [rentalId, setRentalId] = useState("");
  
  useEffect(() => {
    if (!customerId) return;

    console.log("Fetching details for customer ID:", customerId);
    fetch(`/customerDetails?id=${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Customer details received:", data);

        if (data.customer_details && data.customer_details.length > 0) {
          setCustomerDetails(data.customer_details[0]);
        } else {
          console.error("No valid customer details found");
        }

        setTimeout(() => setIsVisible(true), 10);
      })
      .catch((error) => console.error("Error fetching customer details:", error));
  }, [customerId]);

  useEffect(() => {
    if (!customerId) return;

    axios
      .get(`/viewRented?id=${customerId}`)
      .then((response) => setRentals(response.data.rental_details))
      .catch((error) => console.error("Error fetching films:", error));
  }, [customerId]);

  const filteredRentals = rentals;

  if (!customerDetails) return null;

  const returnFilm = async () => {
    try {
      const response = await axios.put(`/returnFilm/${rentalId}/${customerId}`);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
      console.error("Error returning film:", error);
    }
  };

  return (
    <div className={`modal-overlay ${isVisible ? "fade-in" : ""}`}>
      <div className={`cust-details-box ${isVisible ? "slide-up" : ""}`}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Customer Details</h2>
        <p><strong>First Name:</strong> {customerDetails.first_name}</p>
        <p><strong>Last Name:</strong> {customerDetails.last_name}</p>
        <p><strong>Email:</strong> {customerDetails.email}</p>
        <p><strong>Member Since:</strong> {customerDetails.create_date}</p>
        <hr className="section-divider" />
        
        <h2>Rental History</h2>
        <Paper sx={{ width: '100%', margin: 'auto', padding: 0, maxHeight: 500, overflowY: 'auto' }}>
          <TableContainer sx={{ maxHeight: 200 }}>
            <Table size="small" aria-label="rental history">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>Rental ID</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>Title</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>Inventory ID</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>Rental Date</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>Return Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRentals.map((rental) => (
                  <TableRow key={rental.rental_id}>
                    <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>{rental.rental_id}</TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>{rental.title}</TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>{rental.inventory_id}</TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>{rental.rental_date}</TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', padding: '4px' }}>{rental.return_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        <Card 
          variant="outlined" 
          sx={{ 
            maxWidth: 500, 
            margin: "20px auto", 
            textAlign: "center", 
            borderColor: 'black', // Set the outline (border) color to black
            borderWidth: 2 // Optional: You can set the thickness of the border
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
              Return This Film
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Rental ID"
                variant="outlined"
                fullWidth
                value={rentalId}
                onChange={(e) => setRentalId(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={returnFilm}
                sx={{ backgroundColor: "#A02071", color: "white", "&:hover": { backgroundColor: "#D14572" } }}
              >
                Return Film
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CustomerDetails;
