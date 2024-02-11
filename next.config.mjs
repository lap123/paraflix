/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './loaders/tmdb.js',
    },
};

export default nextConfig;
