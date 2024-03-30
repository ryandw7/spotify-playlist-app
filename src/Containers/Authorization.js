import React, { useState } from 'react';
import authFlow from '../calls';
export default function Authorization(){
    const url = authFlow();
    
    return (
        <div>
            <h1>Spotify Playlist Builder</h1>
            <a href={url}>Link Spot </a>
        </div>
    )
}