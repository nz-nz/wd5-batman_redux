import * as ACT from './actions';

export function getMovies(payload) {
    return undefined;
}


export function loadMoviesAct(payload) {

    const action = {
        type: ACT.MOVIES_LOADED,
        payload,
    }

    return action;
}

export function errorOccurredAct(payload) {

    return {
        type: ACT.ERROR_OCCURRED,
        payload,
    };
}

export function viewedMovieAct(payload) {

    return {
        type: ACT.VIEWED_MOVIE,
        payload,
    };
}

export function unViewedMovieAct(payload) {

    return {
        type: ACT.NOT_VIEWED_MOVIE,
        payload,
    };
}