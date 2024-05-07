import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (withPopularity) => {
    const { data } = await axios.get(`/posts/${withPopularity ? `?popularity=true` : ""}`);
    return data;
});

export const fetchPostsWithTag = createAsyncThunk('posts/fetchPostsWithTag', async (tag) => {
    const { data } = await axios.get(`/posts/withTags/${tag}`);
    return data;
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    axios.delete(`/posts/${id}`);
});

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение статей
        [fetchPosts.pending]: (state, action) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        //Получение тегов
        [fetchTags.pending]: (state, action) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        //Удаление статьи
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        },
        //Получение статей с тегами
        [fetchPostsWithTag.pending]: (state, action) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPostsWithTag.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPostsWithTag.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
    }
});

export const postsReducer = postsSlice.reducer;