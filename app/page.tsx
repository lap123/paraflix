"use client";

import React, { Fragment, useState, useMemo } from 'react';

import HomeVideo from './HomeVideo';
import AllVideoRows from './AllVideoRows';
import Preview from './Preview';
import { CurrentPreviewContext, PreviewContext } from './contexts';

export default function Home() {
    const [currentPreview, setCurrentPreview] = useState<PreviewContext>({});

    const previewContext = useMemo(() => ({
        ...currentPreview,
        setCurrentPreview,
    }), [currentPreview, setCurrentPreview]);

    return (
        <Fragment>
            {/* Force pause the Main video player when there is a preview running */}
            <HomeVideo forcePause={!!currentPreview.movie} />
            <CurrentPreviewContext.Provider value={previewContext}>
                <AllVideoRows />
                <Preview />
            </CurrentPreviewContext.Provider>
        </Fragment>
    );
}
