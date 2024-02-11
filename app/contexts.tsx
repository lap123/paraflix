import { createContext } from 'react';

import { Movie } from './types/tmdb';

export interface PreviewContext {
    movie?: Movie,
    x?: number,
    y?: number,
    width?: number,
    isRowFirst?: boolean,
    isRowLast?: boolean,
    setCurrentPreview?: React.Dispatch<React.SetStateAction<PreviewContext>>
}

export const CurrentPreviewContext = createContext<PreviewContext>({});