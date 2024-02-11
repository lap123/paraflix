import React, { useContext } from 'react';

import Poster from './components/Poster';
import styles from './RowPoster.module.css';
import { CurrentPreviewContext } from './contexts';
import { Movie } from './types/tmdb';

interface RowPosterProps {
    movie: Movie,
    index: number
}

export default function RowPoster({ movie, index }: RowPosterProps) {
    const { movie: previewMovie, setCurrentPreview } = useContext(CurrentPreviewContext);

    return (
        <div className={styles.container}>
            <div    
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    if (!setCurrentPreview)
                        return;
                    
                    const sliderWidth = e.currentTarget.closest("div[class*=slider]")?.clientWidth || 0;

                    const target = e.target as HTMLImageElement;

                    const setPreview = () => setCurrentPreview({
                        movie,
                        x: target.x - Math.abs(Math.floor(index/6)) * sliderWidth,
                        y: target.y,
                        width: target.width,
                        isRowFirst: index%6 === 0,
                        isRowLast: index%6 === 5,
                    });

                    if (previewMovie)
                        // There is already an existing preview.
                        // Give some time for the scale down effect before changing the preview movie
                        setTimeout(setPreview, 400);
                    else
                        // set the preview immediately
                        setPreview();
                }}
            >
                <Poster movie={movie} />
            </div>
        </div>
    );
}