import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOutUser } from "../../../redux/actionCreators/personActionCreator"


export const LogOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOutHandler = () => {
    dispatch(logOutUser())
  }

  return (
    <div>
      <Button variant="contained" onClick={() => {logOutHandler(); navigate('/signin')}}>logout</Button>
    </div>
  )
}
