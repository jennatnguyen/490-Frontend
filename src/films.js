import React, { useState } from 'react';
import FilmTable from './components/film/FilmTable';
import FilmDetails from './components/film/FilmDetails';

function Films() {
  const [selectedFilmId, setSelectedFilmId] = useState(null);

  return (
    <>
      <FilmTable onFilmClick={setSelectedFilmId} />
      {selectedFilmId && (
        <FilmDetails filmId={selectedFilmId} onClose={() => setSelectedFilmId(null)} />
      )}
    </>
  );
}

export default Films;
