import { SIGN_IN, LOGOUT } from "../types/personTypes"

export const personReducer = (store = {}, action) => {
  switch (action.type) {
	case SIGN_IN:
      return {
		...store,
		...action.payload
	  }

	case LOGOUT:
      return {
        ...store,
        token: action.payload,
      }
	
	default:
	  return store
  }
}
