import { Modal } from '../Modal/Modal'
import { usePostsDetailContext } from './PostsEditDetailModal'

const PostsDetailModal = () => {
  const {
    viewModal, closeModal, detailPost, submitHandler,
  } = usePostsDetailContext()
  return (
    <Modal
      state={viewModal}
      onClose={closeModal}
      onSubmit={submitHandler}
      {...detailPost}
    />
  )
}

export default PostsDetailModal
