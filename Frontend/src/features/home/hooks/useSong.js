import {getSong} from '../service/song.api';
import { useContext } from 'react';
import { SongContext } from '../song.context';
import { HandLandmarker } from '@mediapipe/tasks-vision';

export function useSong(){
    const context = useContext(SongContext);
    const {loading , setLoading, song, setSong} = context;

    async function handleGetSong({mood}){
        setLoading(true);
        const data = await getSong({mood});
        console.log(data)
        setSong(data.song);
        setLoading(false);
    }
    console.log(song.title)
    return ({loading, song,handleGetSong});
    
}
