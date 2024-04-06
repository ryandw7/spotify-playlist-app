import React, { useEffect, useState } from 'react';
import styles from './Title.module.css'
import { toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';

export default function ({ user }) {
    const [banner, setBanner] = useState('');
    const welcome = `Welcome, ${user}!`;
    const title = 'Spotify Playlist Builder';


    const titleIn = (text) => {
        let arr1 = Array.from(text).toReversed();
        let arr2 = [];
        let string = '';
        for (let i = 0; i < arr1.length; i++) {

            setTimeout(() => {
                arr2.unshift(arr1[i]);
                string = arr2.join('');
                setBanner(string);
                console.log(banner)
            }, 25 * i)
        }
       
    }

    const titleOut = (text) => {
        let arr = Array.from(text);
        let string;
        const time = 25 * arr.length + 1000;
        for (let i = 0; i < arr.length; i++) {
            setTimeout(() => {
                arr.pop();
                string = arr.join('');
                setBanner(string);
                console.log(banner);
            }, (25 * i) + time);

        }
    }
    
    const moveBanner = () => {
        const time = welcome.length * 50 + 1500;
        titleIn(welcome);
        titleOut(welcome);
        setTimeout(()=>{
            titleIn(title);
        }, time)
    }


    useEffect(() => {
        if (user) {
            moveBanner()
        }
    }, [user])
    

    return (
        <div className={styles.Title}>
            <h1>{banner}</h1>
        </div>
    )

}