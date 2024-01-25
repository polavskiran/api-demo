import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getPosts } from "../reduxModule/userSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getAllPosts, getUserPosts } from '../reduxModule/usersState';
import UserPostDetails from './userPostDetails';

export const Home = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [user, setUser] = useState("");
  const userPost = useSelector(getUserPosts(user));

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);

  const onChangeHandler = (event) => {
    setUser(event.target.value);
  };

  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      {user}
      {/* {
        <ul>
          {users?.map((user) => {
            return <p>{user.email}</p>;
          })}
        </ul>
      } */}
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="user">User</InputLabel>
        <Select label="Users" value={user} onChange={onChangeHandler}>
          {users?.map((user) => {
            return <MenuItem value={user.id}>{user.username}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <UserPostDetails posts={userPost} />
    </div>
  );
};

export default Home;
