import { combineReducers } from 'redux'
import { detailPostReducer } from './detailPostReducer'
import { personReducer } from './personReducer'
import postsReducer from './postsReducer'
import { searchReducer } from './searchReducer'

const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  person: personReducer,
  detailPost: detailPostReducer,
})

export default rootReducer
