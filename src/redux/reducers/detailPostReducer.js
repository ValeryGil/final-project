import { ADD_COMMENT, DELETE_COMMENT, DETAIL_POST, EDIT_POST } from "../types/detailPostTypes"

export const detailPostReducer = (store = {}, action) => {
  switch (action.type) {
      case DETAIL_POST:
        return action.payload

      case EDIT_POST:
        return action.payload
      
      case ADD_COMMENT:
        return {
          ...store,
          ...action.payload
        }
    
      case DELETE_COMMENT:
        return {
          ...store,
          comments: store.comments.filter((comment) => comment._id !== action.payload)
        }
        
      default:
        return store
  }
}
