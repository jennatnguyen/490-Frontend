import { useState, useEffect } from "react";
import "./component.css";

const ActorDetails = ({ actorId, onClose }) => {
  const [filmDetails, setFilmDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch film details when actorId changes
  useEffect(() => {
    if (!actorId) return; // Prevent fetch if no actorId is selected

    console.log("Fetching details for actor ID:", actorId);  // Debugging log
    fetch(`/top5-actors-films?actor_id=${actorId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Film details received:", data);  // Debugging log
        setFilmDetails(data.films);  // Set the top 5 rented films of the actor
        setTimeout(() => setIsVisible(true), 10);
      })
      .catch((error) => console.error("Error fetching film details:", error));
  }, [actorId]);

  // Show a message if no film details are loaded
  if (!filmDetails) return <div></div>;

  return (
    <div className={`modal-overlay ${isVisible ? "fade-in" : ""}`}>
      <div className={`film-details-box ${isVisible ? "slide-up" : ""}`}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Top 5 Rented Films for Actor</h2>
        <div className="film-list">
          {filmDetails.map((film) => (
            <div key={film.id} className="film-item">
              <h3>{film.movie}</h3>
              <p><strong>Rental Count:</strong> {film.rentals}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;