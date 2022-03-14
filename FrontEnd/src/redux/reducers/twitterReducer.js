import { ActionTypes } from '../constants/action-type'


const intialState = {
    tweets: []
}

export const twitterReducers = (state = intialState, { type, payload }) => {


    switch (type) {
        case ActionTypes.SEARCH_TWEETS:
            return { ...state, tweets: payload }
        default:
            return state
                ;
    }
}