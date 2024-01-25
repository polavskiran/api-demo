import { Button } from "@mui/material";
import "./movieList.css";
import { useState } from "react";
import EditPost from "./editPost";
import { useDispatch } from "react-redux";
import { deletePost } from '../reduxModule/userSlice';

export const UserPostDetails = (props) => {
  const posts = props.posts;
  const [openDialog, setOpenDialog] = useState(false);
  const [postId, setPostId] = useState("");
  const dispatch = useDispatch();

  const editPostHandler = (postId) => {
    setOpenDialog((prevState) => !prevState);
    setPostId(postId);
  };

  const deletePostHandler = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <>
      <h3>Posts</h3>
      <ul>
        <div className="flex">
          {posts.map((post) => {
            return (
              <div key={post.id} id="editPost">
                <p>{post.title}</p>
                <div id="buttonFlex">
                <Button
                  variant="contained"
                  onClick={() => editPostHandler(post.id)}
                >
                  Edit
                </Button>
                <Button variant="outlined" onClick={() => deletePostHandler(post.id)}>Delete</Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="editPost">
          <EditPost
            open={openDialog}
            onClose={() => editPostHandler()}
            postId={postId}
          />
        </div>
      </ul>
    </>
  );
};

export default UserPostDetails;
