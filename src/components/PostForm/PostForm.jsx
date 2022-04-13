import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loadNewPost } from '../../redux/actionCreators/postsActionCreator';

const PostForm = () => {
  const [title, setTitle] = React.useState('')
  const [text, setText] = React.useState('')
  const [image, setImage] = React.useState('')
  const [tags, setTags] = React.useState('')
  const dispatch = useDispatch()

  const submitHandler = () => {
    const preparedPostQuery = {
      title,
      text,
      image,
      tags: tags.split(',').map((el) => el.trim()),
    }
    dispatch(loadNewPost(JSON.stringify(preparedPostQuery)))
  }

  return (
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
        <TextField id="outlined-basic" maxRows={10} multiline label="Text..." variant="outlined" value={text} onChange={((e) => setText(e.target.value))} />
      </div>
      <div>
        <TextField id="outlined-basic" label="Image" variant="outlined" value={image} onChange={((e) => setImage(e.target.value))} />
      </div>
      <div>
        <TextField id="outlined-basic" label="Tags..." variant="outlined" value={tags} onChange={((e) => setTags(e.target.value))} />
      </div>
      <Button variant="contained" onClick={submitHandler}>Create post</Button>
    </Stack>
  )
}

export default PostForm
