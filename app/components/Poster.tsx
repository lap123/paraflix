"use client";

import React from 'react';
import Image from 'next/image';

import './Poster.css';

export default function Poster({ movie }) {
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