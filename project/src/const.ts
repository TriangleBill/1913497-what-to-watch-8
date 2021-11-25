export enum AppRoute {
   Main= '/',
   SignIn = '/login',
   MyList = '/mylist',
   Film = '/films/:id',
   AddReview = '/films/:id/review',
   Player = '/player/:id'
}

export enum AuthorizationStatus {
   Auth = 'AUTH',
   NoAuth = 'NO_AUTH',
   Unknown = 'UNKNOWN',
 }
export enum LoadedDataStatus {
   Loaded = 'LOADED',
   NoLoaded = 'NO_LOADED',
   Unknown = 'UNKNOWN',
}

export const SHOWN_FILMS_COUNT = 8;


