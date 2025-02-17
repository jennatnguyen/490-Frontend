import { useState, useEffect } from "react";
import "./component.css";

const FilmDetails = ({ filmId, onClose }) => {
  const [filmDetails, setFilmDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch film details when filmId changes
  useEffect(() => {
    if (!filmId) return; // Prevent fetch if no filmId is selected

    console.log("Fetching details for film ID:", filmId);  // Debugging log
    fetch(`/top5-rented-details?id=${filmId}`)
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

  return (
    <div className={`modal-overlay ${isVisible ? "fade-in" : ""}`}>
    <div className={`film-details-box ${isVisible ? "slide-up" : ""}`}>
    <button className="close-button" onClick={onClose}>×</button>
      <h2>{filmDetails.title}</h2>
      <p><strong>Genre:</strong> {filmDetails.genre}</p>
      <p><strong>Description:</strong> {filmDetails.description}</p>
      <p><strong>Release Year:</strong> {filmDetails.release_year}</p>
      <p><strong>Rating:</strong> {filmDetails.rating}</p>
      <p><strong>Rental Count:</strong> {filmDetails.rented}</p>
    </div>
    </div>
  );
};

export default FilmDetails;