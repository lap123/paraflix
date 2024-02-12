"use client";

import React, { useEffect, useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Video } from './types/tmdb';
import Spinner from './components/Spinner';
import Player from './components/Player';

interface HomeInnerVideoProps {
    movieId: number,
    isPaused: boolean
}

interface VideoListResponse {
    id: number,
    results: Video[]
}

export default function HomeInnerVideo({ movieId, isPaused }: HomeInnerVideoProps) {
    const {isPending: isVideoListPending, data: videoList } = useQuery({
        queryKey: ['videoList', movieId],
        queryFn: async () => {
            const { data } = await axios.get<VideoListResponse>(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY}`);
            return data;
        },
        enabled: !!movieId,
    });

    const video = useMemo(() => {
            if (videoList && videoList.results?.length > 0)
                return videoList.results.filter(v => v.site === "YouTube")[0];
            else
                return null;
    }, [videoList]);
    
    return isVideoListPending || !video
        ? <Spinner />
        : <Player videoId={video.key} isPaused={isPaused} />;
}