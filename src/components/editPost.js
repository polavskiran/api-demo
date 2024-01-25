import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByPostId } from "../reduxModule/usersState";
import { updatePost } from "../reduxModule/userSlice";

export const EditPost = (props) => {
  const postDetails = useSelector(getPostByPostId(props.postId));
  const dispatch = useDispatch();
  const [post, setPost] = useState("");

  const onCancelHandler = () => {
    props.onClose();
  };

  const editPostHandler = (event) => {
    console.log(event.target.value);
    setPost(event.target.value);
  };

  const updatePostHandler = () => {
    const userId = postDetails[0].userId;
    const postId = props.postId;
    const title = postDetails[0].title;

    props.onClose();
    return dispatch(updatePost({ postId, userId, title, post }));
  };

  const style = {
    flexDirection: "row",
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth={"sm"}>
      <DialogTitle>{postDetails[0]?.title}</DialogTitle>
      <DialogContent>
        <TextField
          defaultValue={postDetails[0]?.body}
          multiline
          rows={3}
          fullWidth
          onChange={(event) => editPostHandler(event)}
          color="primary"
          sx={{width: '25em'}}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onCancelHandler()} sx={style}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => updatePostHandler()}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPost;
