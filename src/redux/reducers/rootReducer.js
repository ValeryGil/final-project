import { combineReducers } from 'redux'
import { personReducer } from './personReducer'
import postsReducer from './postsReducer'
import { searchReducer } from './searchReducer'

const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  person: personReducer,
})

export default rootReducer
