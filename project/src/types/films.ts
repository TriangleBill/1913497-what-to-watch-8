export type FilmsDescription = {
    id: number;
    name: string;
    genre: string;
    poster_image: string;
    preview_image: string;
    background_image: string;
    background_color: string;
    video_link: string;
    preview_video_link: string;
    description: string;
    rating: number;
    scores_count: number;
    director: string;
    starring: string[];
    run_time: number;
    released: string;
    is_favorite: boolean;
}
