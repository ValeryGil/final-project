import { API_TOKEN } from "../../tokens"
import { DETAIL_POST } from "../types/detailPostTypes"


export const getDetailPost = (post) => ({
  type: DETAIL_POST,
  payload: post,
})

export const getDetailPostQuery = (_id) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/${_id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
  }})
  const postFromApi = await response.json()
  dispatch(getDetailPost(postFromApi))
}
