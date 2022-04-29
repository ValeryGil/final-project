import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { deleteCommentQuery } from '../../redux/actionCreators/commentActionCreator';
import { useParams } from 'react-router-dom';

export const CommentsItem = ({ text, _id }) => {
  const dispatch = useDispatch()
  const { postId } = useParams()
      
  const deleteCommentHandler = () => {
    dispatch(deleteCommentQuery(postId, _id))
  }
  
  return (
    <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
      <ListItem
        key={text}
        disableGutters
        secondaryAction={
          <IconButton aria-label="comment" onClick={deleteCommentHandler}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={text}/>
      </ListItem>
    </List>
  );
}
