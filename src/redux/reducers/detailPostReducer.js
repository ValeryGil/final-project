import { DETAIL_POST, EDIT_POST } from "../types/detailPostTypes"

export const detailPostReducer = (store = {}, action) => {
  switch (action.type) {
      case DETAIL_POST:
        return action.payload

      case EDIT_POST:
        return action.payload
        
      default:
        return store
  }
}
