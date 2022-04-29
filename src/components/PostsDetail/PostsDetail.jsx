import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { orange, red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailPostQuery } from '../../redux/actionCreators/detailPostActionCreator';
import { usePostsDetailContext } from '../PostsDetailModal/PostsEditDetailModal';
import { Comments } from '../Comments/Comments';
import FirstPageTwoToneIcon from '@mui/icons-material/FirstPageTwoTone';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PostsDetail = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()
  const { postId } = useParams()
  const detailPost = useSelector((store) => store.detailPost)
  const { openModal } = usePostsDetailContext()
  const navigate = useNavigate()
      
  useEffect(() => {
    dispatch(getDetailPostQuery(postId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!detailPost.title) return null

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={7}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {detailPost?.author?.name.slice(0, 1)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={detailPost.title}
            subheader={detailPost.created_at.replace("T", " ").replace("Z", " ").substring(0, detailPost.created_at.length - 5)}
          />
          <CardMedia
            component="img"
            height="194"
            image={detailPost.image}
            alt={detailPost.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {detailPost.text.length > 200 ? detailPost.text.slice(0, 200) + '...' : detailPost.text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="share">
              <FirstPageTwoToneIcon onClick={() => navigate('/posts')} />
            </IconButton>
            <CardActions spacing={2}>
              <Button variant="contained" aria-label="outlined primary button group" sx={{ bgcolor: orange[500] }} onClick={openModal}>Edit Post</Button>
            </CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {detailPost.text}
              </Typography>
            </CardContent>
          </Collapse>
          <CardContent spacing={2}>
            <Comments />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ); 
}
