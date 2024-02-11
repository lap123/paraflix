"use client";

import React from 'react';
import Image from 'next/image';

import { Movie } from '../types/tmdb';
import './Poster.css';

interface PosterProps {
    movie: Movie
}

export default function Poster({ movie }: PosterProps) {
    return (
        <div>
            <Image
                width={341}
                height={192}
                src={movie.backdrop_path}
                alt={movie.title}
            />
            {/* <p className="fallback-text">{movie.title}</p> */}
        </div>
    );
}