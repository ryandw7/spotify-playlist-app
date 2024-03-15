import React from 'react';
import Track from './Track';

export default function TrackList({ validTracks, addPlayListTrack}) {
   return validTracks.map((track)=><Track track={track} addPlayListTrack={addPlayListTrack}/>)
}