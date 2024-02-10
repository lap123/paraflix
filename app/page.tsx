"use client";

import React, { Fragment, useState, useMemo } from 'react';

import HomeVideo from './HomeVideo';
import AllVideoRows from './AllVideoRows';
import Preview from './Preview';
import { CurrentPreviewContext } from './contexts';

export default function Home() {
    const [currentPreview, setCurrentPreview] = useState({});

    const previewContext = useMemo(() => ({
        ...currentPreview,
        setCurrentPreview,
    }), [currentPreview, setCurrentPreview]);

    return (
        <Fragment>
            <HomeVideo />
            <CurrentPreviewContext.Provider value={previewContext}>
                <AllVideoRows />
                <Preview />
            </CurrentPreviewContext.Provider>
        </Fragment>
    );
}
