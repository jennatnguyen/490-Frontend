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
      <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
      <div className="section"> {/* Custom background for this section */}
        <TopRentedFilms onFilmClick={setSelectedFilmId} />
        {selectedFilmId && <FilmDetails filmId={selectedFilmId} onClose={() => setSelectedFilmId(null)} />}
      </div>
      </div>

     
      <div style={{paddingTop: '10px'}}>
      <div className="section"> {/* Custom background for this section */}
        <TopActors onActorClick={setSelectedActorId} />
        {selectedActorId && <ActorDetails actorId={selectedActorId} onClose={() => setSelectedActorId(null)} />}
      </div>
      </div>
    </div>
  );
}

export default Home;
