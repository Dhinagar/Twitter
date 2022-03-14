import { ActionTypes } from '../constants/action-type'

export const searchTweets = (tweets) => {
    return {
        type: ActionTypes.SEARCH_TWEETS,
        payload: tweets
    }

}

export const loadMoreTweets = (tweets) => {
    return {
        type: ActionTypes.LOAD_MORE_TWEETS,
        payload: tweets
    }

}