import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addCommentQuery } from '../../redux/actionCreators/commentActionCreator';
import { useParams } from 'react-router-dom';

export const CommentsForm = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { postId } = useParams()
 
  const createCommentHandler = (e) => {
    const preparedComment = {
      text,
    }
    e.preventDefault()
    dispatch(addCommentQuery(postId, preparedComment))
  }

  return (
    <Stack spacing={1} alignItems="center">
      <div>
        <TextField sx={{ width: 425 }} fullWidth placeholder="Write Comment" id="fullWidth" value={text} onChange={((e) => setText(e.target.value))}/>
      </div>
      <div>
        <Button variant="contained" aria-label="outlined primary button group" onClick={createCommentHandler}>Add Comment</Button>
      </div>
    </Stack>
  )
}
