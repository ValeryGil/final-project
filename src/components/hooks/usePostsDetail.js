import { useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editPostQuery, getDetailPostQuery } from '../../redux/actionCreators/detailPostActionCreator'

const usePostsDetail = (closeModal) => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const detailPost = useSelector((store) => store.detailPost)
  //const post = useSelector((store) => store.posts.find((postEl) => postEl._id === postId)) || {}
  
  useLayoutEffect(() => {
    dispatch(getDetailPostQuery(postId))
  }, [postId, dispatch])

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target).entries())
    dispatch(editPostQuery(postId, formData, closeModal))
  }

  return {
    detailPost,
    submitHandler,
  }
}

export default usePostsDetail
