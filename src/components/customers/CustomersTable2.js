import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableContainer,
  Paper,
  TablePagination,
  TextField,
  Box,
  Button
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Customers.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const CustomersTable = ( {onCustomerClick, onAddCustomer, onEditCustomer}) => {
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterText, setFilterText] = useState("")
    const [filterChoice, setFilterChoice] = useState("")

    useEffect( () => {
        axios
            .get("/customerList")
            .then((response) => setCustomers(response.data.customers))
            .catch((error) => console.error("Error fetching customers:", error));
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const handleFilterChange = (event) => {
        setFilterText(event.target.value)
        setPage(0)
      }
    
      const handleFilterChoice = (event) => {
        setFilterChoice(event.target.value);
      };

      const getFilteredResults = () => {
        switch (filterChoice) {
          case "id":
            return customers.filter(customer => customer.id.toString().includes(filterText));
          case "first name":
            return customers.filter(customer => customer.first_name.toLowerCase().includes(filterText.toLowerCase()));
          case "last name":
            return customers.filter(customer => customer.last_name.toLowerCase().includes(filterText.toLowerCase()));
          default:
            return customers; // If no filter is selected, return the full list
        }
      };
      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
          try {
            await axios.delete(`/deleteCustomer/${id}`);
            setCustomers(customers.filter((customer) => customer.id !== id));
          } catch (error) {
            console.error("Error deleting customer:", error);
            alert("Failed to delete customer. Please try again.");
          }
        }
      };

      const handleCustomerClick = (id) => {
        console.log("View details clicked for ID:", id);
        onCustomerClick(id); // Show the details only on a column click
      };

      return (
        <div style={{ textAlign: 'center' }}>
            <h1>Customers</h1>

          <Box className="box" sx={{ display: "flex", alignItems: "center",
            justifyContent: "center", gap: 2, marginBottom: '20px' }}>
          <TextField
            sx={{ width: "30%" }}
            label="Search Customers"
            variant="outlined"
            value={filterText}
            onChange={handleFilterChange}
          />
          
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Filter By</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={filterChoice}
              onChange={handleFilterChoice}
              autoWidth
              label="Filter Choice"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="first name">First Name</MenuItem>
              <MenuItem value="last name">Last Name</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E75480",
              color: "white",
              height: 55,
              "&:hover": { backgroundColor: "#D14572" },
            }}
            onClick={() => {
              console.log("Button clicked inside CustomersTable");
              onAddCustomer();
            }}
          >
            Add Customer
          </Button>
        </Box>         

      <Paper sx={{ width: '80%', margin: 'auto', padding: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="header-row">
                  <TableCell className="header-cell">ID</TableCell>
                  <TableCell className="header-cell">First Name</TableCell>
                  <TableCell className="header-cell">Last Name</TableCell>
                  <TableCell className="header-cell">Email</TableCell>
                  <TableCell className="header-cell">Details</TableCell> 
                  <TableCell className="header-cell">Edit</TableCell>
                  <TableCell className="header-cell">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredResults()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer) => (
                    <TableRow key={customer.id}
                      onClick={() => onCustomerClick(customer.id)}
                      style={{ cursor: "pointer" }}
                      hover>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.first_name}</TableCell>
                      <TableCell>{customer.last_name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                    <TableCell>
                    <Button 
                        variant="outlined" 
                        sx={{ borderColor: '#A02071', color: '#A02071' }}
                        onClick={() => handleCustomerClick(customer.id)} // Trigger details view
                    >
                        View Details
                    </Button>
                    </TableCell>
                    <TableCell>
                    <EditIcon 
                        onClick={(e) => {
                        e.stopPropagation(); // Prevent row click event
                        console.log("Edit clicked for", customer.id);
                        onEditCustomer(customer.id);
                        }} 
                        sx={{
                            cursor: "pointer", 
                            color: "blue",
                            transition: "color 0.2s ease-in-out",
                            "&:hover": { color: "darkblue" }
                        }}
                    />
                    </TableCell>
                
                <TableCell>
                <DeleteIcon 
                    onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(customer.id);
                    }} 
                    sx={{
                        cursor: "pointer", 
                        color: "red",
                        transition: "color 0.2s ease-in-out",
                        "&:hover": { color: "darkred" }
                    }}
                />
                </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={customers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
      </Paper>
      </div>
      );
};

export default CustomersTable;