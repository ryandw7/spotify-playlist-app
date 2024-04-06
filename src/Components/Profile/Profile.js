import React from 'react';
import styles from './Profile.module.css';
import defaultProfilePic from './defaultProfilePic.jpg';
export default function Profile({ user, userImage }){
    return (
        <div className={styles.Profile}>
            {userImage ?
             <img src={userImage.url} alt="profile" className={styles.image}/>
             :
             <img src={defaultProfilePic} className={styles.image}/>
            }
            <p className={styles.p}>{user}</p>
        </div>
    )
}