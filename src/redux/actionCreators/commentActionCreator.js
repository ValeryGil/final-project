import { API_TOKEN } from "../../tokens";
import { ADD_COMMENT, DELETE_COMMENT } from "../types/detailPostTypes";


export const addComment = (newObjectPost) => ({
  type: ADD_COMMENT,
  payload: newObjectPost,
})

export const addCommentQuery = (_id, post, setText) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/comments/${_id}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post)
  })
  const postFromApi = await response.json()
  dispatch(addComment(postFromApi))
  setText('')
}

export const deleteComment = (_id) => ({
  type: DELETE_COMMENT,
  payload: _id,
})

export const deleteCommentQuery = (postId, _id) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/comments/${postId}/${_id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    }
  })
  if (response.status === 200) {
    dispatch(deleteComment(_id))
  }
}
