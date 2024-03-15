import React from 'react';
import Track from './Track';

export default function TrackList({ validTracks }) {
   return validTracks.map((track)=><Track track={track} />)
}