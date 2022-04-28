import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './modal.module.css'
import { modalWrVariants, modalInnerVariants } from './modalAnimation'
import { useDispatch, useSelector } from 'react-redux'
import { editPostQuery } from '../../redux/actionCreators/detailPostActionCreator'
import { useParams } from 'react-router-dom'
import { Button, Stack, TextField } from '@mui/material'

export const Modal = ({ children, state, ...rest }) => ReactDOM.createPortal(
  <AnimatePresence>
    {state && <ModalInner {...rest}>{children}</ModalInner>}
  </AnimatePresence>,
  document.getElementById('modal-root'),
)

const ModalInner = ({ onClose }) => {
  const { postId } = useParams()
  const detailPost = useSelector((store) => store.detailPost)
  
  function escHandler(e) {
    if (e.code === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    window.document.addEventListener('keydown', escHandler)
    return () => {
      window.document.removeEventListener('keydown', escHandler)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeClickHandler = () => {
    onClose()
  }

  const innerClickHandler = (e) => {
    e.stopPropagation()
  }

  const [title, setTitle] = useState(detailPost.title)
  const [text, setText] = useState(detailPost.text)
  const [image, setImage] = useState(detailPost.image)
  const [tags, setTags] = useState(detailPost.tags.join(', '))

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    const preparedPostQuery = {
      title,
      text,
      image,
      tags: tags.split(',').map((el) => el.trim()),
    }
    e.preventDefault()
    dispatch(editPostQuery(postId, preparedPostQuery, onClose))
  }

  return (
    <AnimatePresence>
      <motion.div variants={modalWrVariants} initial="start" animate="show" exit="end" onClick={closeClickHandler} className={styles.wrapper}>
        <motion.div
          variants={modalInnerVariants}
          onClick={innerClickHandler}
          className={styles.inner}
        >
          <svg
            onClick={closeClickHandler}
            role="button"
            className={`bi bi-x-lg ${styles.icon}`}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
          </svg>
          <Stack
            component="form"
            alignItems="center"
            sx={{
              width: '25ch',
            }}
            spacing={2}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField id="outlined-basic" label="Title..." variant="outlined" value={title} onChange={((e) => setTitle(e.target.value))} />
            </div>
            <div>
              <TextField id="outlined-basic" label="Text..." variant="outlined" multiline sx={{ width: '25ch' }} value={text} onChange={((e) => setText(e.target.value))} />
            </div>
            <div>
              <TextField id="outlined-basic" label="Image" variant="outlined" value={image} onChange={((e) => setImage(e.target.value))} />
            </div>
            <div>
              <TextField id="outlined-basic" label="Tags" variant="outlined" value={tags} onChange={((e) => setTags(e.target.value))} />
            </div>
            <Button variant="contained" onClick={submitHandler}>Edit post</Button>
          </Stack>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
