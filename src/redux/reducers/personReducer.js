import { SIGN_IN } from "../types/personTypes"

export const personReducer = (store = {}, action) => {
  switch (action.type) {
	case SIGN_IN:
      return {
		...store,
		...action.payload
	  }
	
	default:
	  return store
  }
}
