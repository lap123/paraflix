import React, { useEffect, useRef } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';

import styles from './Player.module.css';

interface PlayerProps {
    videoId: string,
    isPaused: boolean
}

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

export default function Player({ videoId, isPaused }: PlayerProps) {
    const playerRef = useRef<YouTubePlayer>(null);
    
    useEffect(() => {
        // Do not attempt to play or pause if the player is not ready
        if (!playerRef.current)
            return;

        playerRef.current.internalPlayer
            .getPlayerState()
            .then((playerState: number) => {
                if (isPaused && playerState === YouTube.PlayerState.PLAYING)
                    playerRef.current.internalPlayer.pauseVideo();
                else if (!isPaused && playerState === YouTube.PlayerState.PAUSED)
                    playerRef.current.internalPlayer.playVideo();
            });
    }, [isPaused, playerRef]);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.playVideo();
    };

    return (
        <YouTube
            ref={playerRef}
            className={styles.player}
            videoId={videoId}
            opts={videoOpts}
            onReady={onPlayerReady}
        />
    )
}