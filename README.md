## Purpose

This is one Netflix desktop clone implementation.
The objectives are to show how it can be done and learn a few things in the process.

## Stack

- ReactJS
- NextJS
- React Query
- TypeScript

## Data source

Based on TMDB api.
The videos are mostly trailers sourced from youtube.

## Limitations

<p>This is not a platform to watch movies. Therefore, the app is limited to the front page and all related interactions.
Only movies are shown, not TV shows.</p>
<p>For each category row, there is no loop scrolling yet (when you reach the end of the category). It requires moving poster nodes around.</p>
<p>More features are missing</p>

## Get Started

1. Create an `.env.local` file at the root of the project
2. Add your TMDB API key you got from https://www.themoviedb.org/settings/api:

```
NEXT_PUBLIC_TMDB_APIKEY=<your_key>
```

3. Then start Next: `npm run dev`
