"use client";

import React, { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';

export default function App({ children }: Readonly<{children: React.ReactNode}>) {
    const [queryClient] = useState(new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Analytics />
        </QueryClientProvider>
    )
}