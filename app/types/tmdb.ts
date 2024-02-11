
export interface MovieGenre {
    name: string,
    id: number,
}

export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: String,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface Video {
    id: string,
    iso_3166_1: string,
    iso_639_1: string,
    key: string,
    name: string,
    official: true,
    published_at: string,
    site: string,
    size: number,
    type: "Behind the Scenes" | "Bloopers" | "Clip" | "Featurette" | "Teaser" | "Trailer"
}