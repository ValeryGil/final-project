import { API_TOKEN } from "../../tokens"
import { SET_ALL_POSTS, ADD_NEW_POST } from "../types/postsTypes"

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  payload: allPosts,
})

export const loadAllPosts = (searchValue) => async (dispatch) => {
  const urlForFetch = searchValue
    ? `https://api.react-learning.ru/posts/search/?query=${searchValue}`
    : 'https://api.react-learning.ru/posts'
  
  const response = await fetch(urlForFetch, {
    headers: {
      authorization: `Bearer ${API_TOKEN}`
    }
  })
  const postsFromApi = await response.json()
  dispatch(setAllPosts(postsFromApi))
}

export const addNewPost = (allPosts) => ({
  type: ADD_NEW_POST,
  payload: allPosts,
})

export const loadNewPost = (post) => async (dispatch) => {
  const response = await fetch('https://api.react-learning.ru/posts', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: post
  })
  const postsFromApi = await response.json()
  dispatch(addNewPost(postsFromApi))
}
