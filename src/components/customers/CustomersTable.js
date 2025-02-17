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
  Box
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Customers.css'

const CustomersTable = ( {onCustomerClick}) => {
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

      return (
        <div style={{ textAlign: 'center' }}>
            <h1>Customers</h1>
            <Paper sx={{ width: '80%', margin: 'auto', padding: 2 }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="header-row">
                        <TableCell className="header-cell">ID</TableCell>
                        <TableCell className="header-cell">First Name</TableCell>
                        <TableCell className="header-cell">Last Name</TableCell>
                        <TableCell className="header-cell">Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((customers) => (
                          <TableRow key={customers.id}
                            onClick={() => onCustomerClick(customers.id)}
                            style={{ cursor: "pointer" }}
                            hover>
                            <TableCell>{customers.id}</TableCell>
                            <TableCell>{customers.first_name}</TableCell>
                            <TableCell>{customers.last_name}</TableCell>
                            <TableCell>{customers.email}</TableCell>
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