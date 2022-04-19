import { ADD_NEW_POST, DELETE_POST, SET_ALL_POSTS } from "../types/postsTypes"

const postsReducer = (store = [], action) => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return action.payload

    case ADD_NEW_POST:
      return [
        ...store,
        action.payload
      ]

    case DELETE_POST:
      return store.filter((post) => post._id !== action.payload)
    
    default:
      return store
  }
}

export default postsReducer
