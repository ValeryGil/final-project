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
import { green, orange, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getDetailPostQuery } from '../../redux/actionCreators/detailPostActionCreator';


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
            subheader="September 14, 2016" // new Date(month, date, year)
          />
          <CardMedia
            component="img"
            height="194"
            image={detailPost.image}
            alt={detailPost.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {detailPost.text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorite">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <CardActions spacing={2}>
              <Button variant="contained" aria-label="outlined primary button group" sx={{ bgcolor: green[500] }}>Add Comment</Button>
              <Button variant="contained" aria-label="outlined primary button group" sx={{ bgcolor: orange[500] }}>Edit Post</Button>
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
        </Card>
      </Grid>
    </Grid>
  ); 
}
