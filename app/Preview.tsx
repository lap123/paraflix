import React, { useContext, useState, useEffect } from 'react';
import cx from 'classnames';

import Poster from './components/Poster';
import HomeInnerVideo from './HomeInnerVideo';
import { CurrentPreviewContext } from './contexts';

import styles from './Preview.module.css';
import PreviewDetails from './PreviewDetails';

const DefaultScaleRatio = 1;
const ZoomScaleRatio = 1.6;

export default function Preview() {
    const [ scale, setScale ] = useState(DefaultScaleRatio);
    const { movie, x, y, width, isRowFirst, isRowLast, setCurrentPreview } = useContext(CurrentPreviewContext);

    useEffect(() => {
        if (!movie)
            return;

        // Trigger the scaling effect after 400ms
        const timeoutId = setTimeout(() => setScale(ZoomScaleRatio), 400);

        return () => clearTimeout(timeoutId);
    }, [movie]);

    if (!movie)
        return null;

    return (
        <div
            className={styles.container}
            // The onMouseOut event applies to the preview which overlays
            // the actual poster from which the onMouseOver origins
            onMouseOut={() => {
                // Scale down first
                setScale(1);

                // and then remove the preview overlay after 400ms
                if (setCurrentPreview)
                    setTimeout(() => setCurrentPreview({}), 400);
            }}
        >
            <div
                className={styles.focus}
                style={{
                    top: (y || 0) + window.scrollY,
                    left: x,
                    width: width,
                    transform: `scale(${scale})`,
                    transformOrigin: isRowFirst ? "left center" : isRowLast ? "right center" : "center center",
                }}
            >
                <div className="relative">
                     <HomeInnerVideo movieId={movie.id} isPaused={false} />
                    <Poster movie={movie} className={cx(styles.poster, {
                        'opacity-100': scale === DefaultScaleRatio,
                        'opacity-0': scale === ZoomScaleRatio,
                     })} />
                </div>
                <PreviewDetails className={cx({'opacity-0': scale === DefaultScaleRatio})}/>
            </div>
        </div>
    );
}