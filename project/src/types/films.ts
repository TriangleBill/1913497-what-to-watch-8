export type FilmsDescription = {
  id: number;
  name: string;
  genre: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  released: string;
  isFavorite: boolean;
}

export type FilmReviews = {
  id: number,
  user: {
    id: number,
    name: string
  },
  rating: number,
  comment: string,
  date: string
}

export type ParsedFilmReviews = {
  id: number,
  user: {
    id: number,
    name: string
  },
  rating: number,
  comment: string,
  date: number
}
