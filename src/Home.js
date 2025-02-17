// src/Home.js
import React, { useState } from 'react';
import TopRentedFilms from './components/home/TopRentedFilms';
import FilmDetails from './components/home/FilmDetails';
import TopActors from './components/home/TopActors';
import ActorDetails from './components/home/ActorDetails';

function Home() {
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const [selectedActorId, setSelectedActorId] = useState(null);

  return (
    <div>
      <h1>Movie Rental Dashboard</h1>

      <div style={{ marginTop: "70px" }}>
        <TopRentedFilms onFilmClick={setSelectedFilmId} />
        {selectedFilmId && <FilmDetails filmId={selectedFilmId} onClose={() => setSelectedFilmId(null)} />}
      </div>

      <div style={{ marginTop: "90px" }}></div>
      <TopActors onActorClick={setSelectedActorId} />
      {selectedActorId && <ActorDetails actorId={selectedActorId} onClose={() => setSelectedActorId(null)} />}
    </div>
  );
}

export default Home;
