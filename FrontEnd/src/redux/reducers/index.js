import { combineReducers } from "redux";
import { twitterReducers } from "./twitterReducer";
export const Reducers = combineReducers({
    allTweets: twitterReducers
})