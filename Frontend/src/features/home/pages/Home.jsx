import React from 'react';
import FaceExpression from '../../Expression/components/FaceExpressions';
import Player from '../components/Player';
import { SongContextProvider } from '../song.context';
import { useSong } from '../hooks/useSong';

const Home = () => {

const {handleGetSong} = useSong();

  return (
    <SongContextProvider>
      
        <FaceExpression 
          onClick={(expression) => { handleGetSong({ mood: expression }) }}
        />
        <Player />
      
    </SongContextProvider>
  );
};

export default Home;

