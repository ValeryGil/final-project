import { createContext, useContext, useMemo } from 'react'
import usePostsDetail from '../hooks/usePostsDetail'
import usePostsModal from '../hooks/usePostsModal'
import { PostsDetail } from '../PostsDetail/PostsDetail'
import PostsDetailModal from './PostsDetailModal'

const PostsDetailContext = createContext()

const PostsEditDetailModal = () => {
  const { viewModal, closeModal, openModal } = usePostsModal()
  const { detailPost, submitHandler } = usePostsDetail(closeModal)

  const sharedValues = useMemo(() => ({
    viewModal, closeModal, openModal, detailPost, submitHandler,
  }), [detailPost, viewModal])

  console.log({sharedValues, closeModal})

  return (
    <PostsDetailContext.Provider value={sharedValues}>
      <div className="d-flex justify-content-center">
        <PostsDetail />
        <PostsDetailModal />
      </div>
    </PostsDetailContext.Provider>
  )
}

export default PostsEditDetailModal

export const usePostsDetailContext = () => useContext(PostsDetailContext)
