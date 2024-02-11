"use client";

import React, { Fragment } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import Spinner from './components/Spinner';
import VideoRow from './VideoRow';
import { MovieGenre } from './types/tmdb';

interface MovieGenreResponse {
    genres: MovieGenre[]
}

export default function AllVideoRows() {
    const {isPending: isGenreMovieListPending, data: genreMovieList } = useQuery({
        queryKey: ['genreMovieList'],
        queryFn: async () => {
            const { data } = await axios.get<MovieGenreResponse>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY}`);
            return data;
        },
    });

    if (isGenreMovieListPending || !genreMovieList)
        return <Spinner />;

    return (
        <Fragment>
            {genreMovieList.genres.map(genre => <VideoRow key={genre.name} genre={genre} />)}
        </Fragment>
    );
}