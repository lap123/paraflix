"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import Spinner from './components/Spinner';
import HomeInnerVideo from './HomeInnerVideo';
import HomeVideoDetails from './HomeVideoDetails';
import styles from './HomeVideo.module.css';

const random = (max: number) => {
    return Math.ceil(Math.random() * max);
};

interface HomeVideoProps {
    forcePause: boolean
}

export default function HomeVideo({ forcePause }: HomeVideoProps) {
    const [isPaused, setPaused] = useState<boolean>(false);

    const videoElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.75,
          };
          
        const observerCB = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                setPaused(paused => !entry.isIntersecting);
            });
        };

        const observer = new IntersectionObserver(observerCB, options);
        if (videoElementRef.current)
            observer.observe(videoElementRef.current);

        return () => {
            if (videoElementRef.current)
                observer.unobserve(videoElementRef.current);
        };
    }, []);

    const {isPending: isMovieListPending, data: movieList } = useQuery({
        queryKey: ['movieList'],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY}`);
            return data;
        },
    });

    const movie = useMemo(() => {
        const videoIndex = movieList?.results?.length > 0 ? random(movieList.results.length) : 0;
        return movieList?.results?.length > 0 ? movieList.results[videoIndex] : null;
    }, [movieList]);

    return (
        <div className={styles.mainVideoContainer}>
            {movie && <HomeVideoDetails movie={movie} />}
            <div ref={videoElementRef} className={styles.videoInner}>
                {isMovieListPending && <Spinner />}
                {movie && <HomeInnerVideo movieId={movie.id} isPaused={isPaused || forcePause } />}
    
                <div className={styles.vignette} />
            </div>
        </div>
    );
}