import { createSelector } from "@reduxjs/toolkit";

export const getAllPosts = state => state.posts.posts;

export const getUserPosts = (id) => createSelector(
    [getAllPosts],
    posts => posts.filter(post => post.userId === id)
);

export const getPostByPostId = (id) => createSelector(
    [getAllPosts],
    posts => posts.filter(post => post.id === id)
);