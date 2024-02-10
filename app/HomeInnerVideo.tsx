"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import Spinner from './components/Spinner';
import styles from './HomeInnerVideo.module.css';

export default function HomeInnerVideo({ movieId, isPaused }) {
    const playerRef = useRef(null);
    
    const onPlayerReady = (event: YouTubePlayer) => {
        event.target.playVideo();
    };

    const videoOpts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          modestbranding: 1,
          fs: 0,
          rel: 0,
          showinfo: 0,
          controls: 0,
          cc_load_policy: 0,
          iv_load_policy: 0,
          mute: 1,
        },
    };

    const {isPending: isVideoListPending, data: videoList } = useQuery({
        queryKey: ['videoList', movieId],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY}`);
            return data;
        },
        enabled: !!movieId,
    });

    const video = useMemo(() => {
            if (videoList?.results?.length > 0)
                return videoList.results.filter(v => v.site === "YouTube")[0];
            else
                return null;
    }, [videoList]);

    useEffect(() => {
        if (!playerRef.current)
            return;

        if (isPaused)
            playerRef.current.internalPlayer.pauseVideo();
        else
            playerRef.current.internalPlayer.playVideo();
    }, [isPaused, playerRef]);

    return isVideoListPending
        ? <Spinner />
        : (
        <YouTube
            ref={playerRef}
            className={styles.player}
            videoId={video.key}
            opts={videoOpts}
            onReady={onPlayerReady}
        />
    );
}