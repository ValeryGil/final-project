import { API_TOKEN } from "../../tokens"
import { DETAIL_POST, EDIT_POST } from "../types/detailPostTypes"


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

export const editPost = (editedPost) => ({
  type: EDIT_POST,
  payload: editedPost,
})

export const editPostQuery = (_id, formData, closeModal) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/${_id}`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const updatedPostFromServer = await response.json()
  dispatch(editPost(updatedPostFromServer))
  closeModal()
}
