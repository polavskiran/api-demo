import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: null,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const resp = await users.json();

  return resp;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      });
  },
});

const initialPostState = {
  loading: false,
  posts: [],
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const postsResp = await fetch("https://jsonplaceholder.typicode.com/posts");
  const resp = await postsResp.json();

  return resp;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, userId, title, post }) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: userId,
          id: postId,
          title: title,
          body: post,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const response = await resp.json();
    return response;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {
    deletePost: (state, action) => {
      const existingPosts = [...state.posts];
      const updatedResult = existingPosts.filter(
        (post) => post.id !== action.payload
      );
      state.posts = [...updatedResult];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
      });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      // Find the index of the updated post in our list and replace it with the new one
      console.log(action.payload);
      const foundIndex = state.posts.findIndex(
        (p) =>
          p.id === action.payload?.id && p.userId === action.payload?.userId
      );

      if (foundIndex !== -1) {
        state.posts[foundIndex] = action.payload;
      }
    });
  },
});

export const { deletePost } = postsSlice.actions;
export const userReducer = usersSlice.reducer;
export const postsReducer = postsSlice.reducer;
