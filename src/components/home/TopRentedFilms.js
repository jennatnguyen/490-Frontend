import { useState, useEffect } from "react";
import "./component.css";
    // usestate is for setting js obj for storing and 
    // using data
const TopRentedFilms = ({ onFilmClick }) => {
    const [films, setFilms] = useState([]); // Initialize as an empty array

    //useeffect for single rendering
    useEffect( () => {
        fetch("/top5-rented-films")
        .then((response) => response.json())
        .then((data) => {
            console.log("API Response:", data); // debug
            setFilms(data.films); //set array of films
        })
        .catch((error) => console.error("Error fetching films:", error));
    }, []);

    return(
        <div>
        <h1>Top 5 Films</h1>
        <div className="films-container">
            {films.map((film,index) => (
                <div 
                    key={index} 
                    onClick={() => {
                    console.log("Selected Film ID:", film.id);
                    onFilmClick(film.id);
                }}
                    className="film-box"
                    >
                        <h3>{film.title}</h3>
                        <p>Rented: {film.rented} times</p>
                </div>
            ))}
        </div>
        </div>
);
    };//end of top rented
export default TopRentedFilms;