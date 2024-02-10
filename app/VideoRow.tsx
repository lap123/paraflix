"use client";

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'

import Spinner from './components/Spinner';
import RowPoster from './RowPoster';
import styles from './VideoRow.module.css';

export default function VideoRow({ genre }) {
    const [scrollClicked, setScrollClicked] = useState<number>(0);
    const [scrollCount, setScrollCount] = useState<number>(0);

    const {isPending: isMovieListPending, data: movieList } = useQuery({
        queryKey: ['movieListByGenre', genre.name],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_genres=${genre.id}&api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY}`);
            return data;
        },
    });

    useEffect(() => {
        let timeoutId = null;

        if (scrollClicked !== 0) {
            timeoutId = setTimeout(() => setScrollClicked(0), 750);
        }

        return () => {
            if (timeoutId)
                clearTimeout(timeoutId);
        }
    }, [scrollClicked])

    const filteredMovieList = useMemo(() => {
        if (!movieList)
            return [];

        // Keep only entries which have a backdrop cover
        const movieListWithCover = movieList.results.filter(movie => !!movie.backdrop_path);
        // Limit entries to a multiple of 6 (6 covers per row displayed)
        return movieListWithCover.slice(0, (movieListWithCover.length%6) * 6);
    }, [movieList]);

    const canScrollForward = scrollCount < (filteredMovieList.length / 6 - 1);
    const canScrollBackward = scrollCount > 0;

    if (isMovieListPending)
        return <Spinner />;

    return (
        <div className={styles.row}>
            <h2 className={styles.header}>{genre.name}</h2>
            <div className={styles.content}>
                <span className={cx(styles.previous, { '!hidden': !canScrollBackward})} onClick={() => {
                    setScrollClicked(-1);
                    setScrollCount(count => count - 1);
                }}>
                    <ChevronLeftIcon className="hover:font-medium hover:scale-125 transition ease-out duration-100" />
                </span>

                <div className={cx(styles.slider, {
                    '-translate-x-full': scrollCount === 1,
                    '-translate-x-fullx2': scrollCount === 2,
                    '-translate-x-fullx3': scrollCount === 3,
                    '-translate-x-fullx4': scrollCount === 4,
                    '-translate-x-fullx5': scrollCount === 5,
                    [styles.animating]: scrollClicked !== 0
                })}>
                    {filteredMovieList.map((movie, index) => <RowPoster key={movie.id} movie={movie} index={index} />)}
                </div>
            
                <span className={cx(styles.next, { '!hidden': !canScrollForward})} onClick={() => {
                    setScrollClicked(1);
                    setScrollCount(count => count + 1);
                }}>
                    <ChevronRightIcon className="hover:font-medium hover:scale-125 transition ease-out duration-100" />
                </span>
            </div>
        </div>
    );
}