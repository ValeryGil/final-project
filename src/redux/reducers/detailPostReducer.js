import { DETAIL_POST } from "../types/detailPostTypes"


export const detailPostReducer = (store = {}, action) => {
  switch (action.type) {
      case DETAIL_POST:
        return action.payload
        
      default:
        return store
  }
}
