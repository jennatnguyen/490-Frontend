import { useState, useEffect } from "react";
import "./component.css";
    // usestate is for setting js obj for storing and 
    // using data
const TopActors = ({ onActorClick }) => {
    const [actors, setActors] = useState([]); // Initialize as an empty array

    //useeffect for single rendering
    useEffect( () => {
        fetch("/top5-actors")
        .then((response) => response.json())
        .then((data) => {
          //  console.log("API Response:", data); // debug
            setActors(data.actors); //set array of actors
        })
        .catch((error) => console.error("Error fetching actors:", error));
    }, []);

    return(
        <div>
        <h1>Top 5 Actors</h1>
        <div className="films-container">
            {actors.map((actor,index) => (
                <div 
                    key={actor.id || index} 
                    onClick={() => {
                    console.log("Selected Actor ID:", actor.id);
                    onActorClick(actor.id);
                }}
                    className="film-box"
                    >
                        <h3>{actor.name}</h3>
                        <p>Movies: {actor.movies}</p>
                </div>
            ))}
        </div>
        </div>
);
    };//end of top rented
export default TopActors;