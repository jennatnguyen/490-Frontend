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
import './FilmTable.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FilmsTable = ( {onFilmClick} ) => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterText, setFilterText] = useState("")

  const [filterChoice, setFilterChoice] = useState("")

  useEffect(() => {
    axios
      .get("/getTable") 
      .then((response) => setFilms(response.data.films))
      .catch((error) => console.error("Error fetching films:", error));
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
      case "title":
        return films.filter(film => film.title.toLowerCase().includes(filterText.toLowerCase()));
      case "genre":
        return films.filter(film => film.genre.toLowerCase().includes(filterText.toLowerCase()));
      case "actors":
        return films.filter(film => film.actors.toLowerCase().includes(filterText.toLowerCase()));
      default:
        return films; // If no filter is selected, return the full list
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Films</h1>

      <Box className="box" sx={{ marginBottom: '20px' }}>
        <TextField 
        width = "40%"
        label="Search Films"
        variant="outlined"
        value={filterText}
        onChange={handleFilterChange}
        >
        </TextField>
        <FormControl sx={{ minWidth: 100 }}>
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
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="genre">Genre</MenuItem>
          <MenuItem value="actors">Actor Name</MenuItem>
        </Select>
      </FormControl>
      </Box>
      <Paper sx={{ width: '80%', margin: 'auto', padding: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="header-row">
                <TableCell className="header-cell">ID</TableCell>
                <TableCell className="header-cell">Title</TableCell>
                <TableCell className="header-cell">Genre</TableCell>
                <TableCell className="header-cell">Actors</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getFilteredResults()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((film) => (
                  <TableRow key={film.id}
                    onClick={() => onFilmClick(film.id)}
                    style={{ cursor: "pointer" }}
                    hover>
                    <TableCell>{film.id}</TableCell>
                    <TableCell>{film.title}</TableCell>
                    <TableCell>{film.genre}</TableCell>
                    <TableCell>{film.actors}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={films.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  );
};

export default FilmsTable;
