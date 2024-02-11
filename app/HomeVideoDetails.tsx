import React from 'react';

import { Movie } from './types/tmdb';
import styles from './HomeVideoDetails.module.css';

interface HomeVideoDetailsProps {
    movie: Movie
}

export default function HomeVideoDetails({ movie }: HomeVideoDetailsProps) {
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