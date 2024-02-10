import React from 'react';

import styles from './HomeVideoDetails.module.css';

export default function HomeVideoDetails({ movie }) {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.title}>
                    <p>{movie.title}</p>
                </div>

                <div className={styles.description}>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>

    );
}