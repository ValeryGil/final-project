import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadAllPosts } from "../../redux/actionCreators/postsActionCreator"
import { useDebounce } from "../hooks/useDebounce"
import PostsItem from "../PostsItem/PostsItem"

const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector((store) => store.posts)
  const search = useSelector((store) => store.search)
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    dispatch(loadAllPosts(debouncedSearch))
  }, [debouncedSearch, dispatch])

  if(!posts.length) return <div>Posts list is empty</div>

  return (
    <Grid container spacing={2} justifyContent="center">
      {posts.map((post) => {
        return <PostsItem key={post._id} {...post} />
      })}
    </Grid>
  )
}

export default PostsList
