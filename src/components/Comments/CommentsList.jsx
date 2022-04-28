import { CardActions, CardContent, Collapse, IconButton, styled, Typography } from '@mui/material';
import { motion } from 'framer-motion'
import { AnimatePresence } from "framer-motion"
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { CommentsItem } from './CommentsItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const postsListVariants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
}

export const CommentsList = () => {
  const [expanded, setExpanded] = useState(false);
  const detailPost = useSelector((store) => store.detailPost)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardActions disableSpacing>
        <Typography>
          Comments:
        </Typography>        
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
            {
              detailPost.comments.length ? (
                <motion.div variants={postsListVariants} initial="start" animate="end" fullWidth label="fullWidth" id="fullWidth">
                  <AnimatePresence>
                    {detailPost.comments.map((comment) => (
                      <CommentsItem key={comment._id} {...comment} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : null
            }
          </Typography>
        </CardContent>
      </Collapse>
    </>
  )
}
