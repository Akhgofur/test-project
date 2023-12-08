import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jsonPlaceHolderUrl } from "../utils/axios";
import { toast } from "react-toastify";
import { getLocalPagination } from "../utils/functions";

const initialState = {
  fullData: [],
  data: [],
  status: "idle",
  limit: 10,
  page: 1,
  search: "",
  filter: null,
};

export const getPosts = createAsyncThunk("/posts/get", async () => {
  const res = await axios.get(jsonPlaceHolderUrl + "posts");
  console.log(res);
  return res?.status == 200 ? res?.data : [];
});

const posts = createSlice({
  initialState,
  name: "posts",
  reducers: {
    paginatePosts(state, { payload: { limit, page } }) {
      state.page = page;
      state.limit = limit;
      state.data = getLocalPagination(state.fullData, limit, page);
    },
    filterPosts(state, { payload: { search, filter } }) {
      state.search = search;
      state.filter = filter;
      if (search || filter) {
        state.data = state.fullData?.filter((item) => {
          const searchVal = search ? item?.title?.includes(search) : true;
          const filterVal = filter ? item.title == filter?.title : true;
          return searchVal && filterVal;
        });
        return;
      }
      state.data = getLocalPagination(state.fullData, state.limit, state.page);
    },
    createPost(state, {payload}) {
        state.fullData = [...state.fullData, payload]
        state.data = getLocalPagination(state.fullData, state.limit, state.page);
        toast.success("Post created")
    },
    editPost(state, {payload}) {
        state.fullData = state.fullData?.map(item => {
            if(item?.id == payload?.id) {
                return {...payload, userId: item?.userId}
            }
            return item
        })
        state.data = getLocalPagination(state.fullData, state.limit, state.page);
        toast.success("Post edited")
    },
    deletePost(state, action) {
      state.data = state.data?.filter((item) => item?.id != action.payload);
      toast.success("Post deleted");
      return;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.fullData = action.payload;
        state.data = getLocalPagination(
          state.fullData,
          state.limit,
          state.page
        );
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { deletePost, paginatePosts, filterPosts, createPost, editPost } = posts.actions;
export const reducer = posts.reducer;
