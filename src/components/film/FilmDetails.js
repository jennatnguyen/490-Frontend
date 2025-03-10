import { useState, useEffect } from "react";
import './FilmTable.css';
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";


const FilmDetails = ({ filmId, onClose }) => {
  const [filmDetails, setFilmDetails] = useState(null);
  const [customerId, setCustomerId] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  // Fetch film details when filmId changes
  useEffect(() => {
    if (!filmId) return; // Prevent fetch if no filmId is selected

    console.log("Fetching details for film ID:", filmId);  // Debugging log
    fetch(`/film-details?id=${filmId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Film details received:", data);  // Debugging log
        const filmDetail = data.film_details.find(film => film.id === filmId);
        setFilmDetails(filmDetail);
        setTimeout(() => setIsVisible(true), 10);
      })
      .catch((error) => console.error("Error fetching film details:", error));
  }, [filmId]);

  // Show a message if no film details are loaded
  if (!filmDetails) return;

  const rentFilm = async () => {
    try {
      const response = await axios.post("/rentFilm", {
        customer_id: customerId,
        film_id: filmId,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
      console.error("Error renting film:", error);
    }
  }

  return (
    <div className={`modal-overlay ${isVisible ? "fade-in" : ""}`}>
    <div className={`film-details-box ${isVisible ? "slide-up" : ""}`}>
    <button className="close-button" onClick={onClose}>×</button>
      <h2>{filmDetails.title}</h2>
      <p><strong>Genre:</strong> {filmDetails.genre}</p>
      <p><strong>Description:</strong> {filmDetails.description}</p>
      <p><strong>Release Year:</strong> {filmDetails.release_year}</p>
      <p><strong>Rating:</strong> {filmDetails.rating}</p>
      <p><strong>Rental Rate:</strong> {filmDetails.rental_rate}</p>
      <p><strong>Length:</strong> {filmDetails.length}</p>
      <p><strong>Replacement Cost:</strong> {filmDetails.replacement_cost}</p>
      <p><strong>Duration:</strong> {filmDetails.duration}</p>
      <Card variant="outlined" 
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
          Rent This Film
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Customer ID"
            variant="outlined"
            fullWidth
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" fullWidth onClick={rentFilm}
          sx={{ backgroundColor: "#A02071", color: "white", "&:hover": { backgroundColor: "#D14572" } }}>
            Rent Film
          </Button>
        </Box>
      </CardContent>
    </Card>
    </div>
    </div>
  );
};

export default FilmDetails;