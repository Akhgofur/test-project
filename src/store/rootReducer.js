import { combineReducers } from "@reduxjs/toolkit";
import {reducer as posts} from "../slices/posts"


const rootReducer = combineReducers({
    posts
})

export default rootReducer