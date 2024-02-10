import React, { useContext } from 'react';

import Poster from './components/Poster';
import styles from './RowPoster.module.css';
import { CurrentPreviewContext } from './contexts';

export default function RowPoster({ movie, index }) {
    const { movie: previewMovie, setCurrentPreview } = useContext(CurrentPreviewContext);

    return (
        <div className={styles.container}>
            <div    
                onMouseEnter={(e) => {
                    const sliderWidth = e.target.closest("div[class*=slider]").clientWidth;

                    const setPreview = () => setCurrentPreview({
                        movie,
                        x: e.target.x - Math.abs(Math.floor(index/6)) * sliderWidth,
                        y: e.target.y,
                        width: e.target.width,
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