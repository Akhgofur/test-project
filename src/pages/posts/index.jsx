import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../components/loader";
import Table from "../../components/table";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AutocompleteSelect from "../../components/autocomplete-select";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, filterPosts, getPosts, paginatePosts } from "../../slices/posts";
import DeleteModal from "../../components/delete-modal";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { postsTableHeaders } from "../../utils/consts";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [post, setPost] = useState(null);
  const [isDelete, setDelete] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts.data);
  const fullData = useSelector((state) => state.posts.fullData);
  const postsStatus = useSelector((state) => state.posts.status);
  const limit = useSelector((state) => state.posts.limit);
  const page = useSelector((state) => state.posts.page);
  const filter = useSelector((state) => state.posts.filter);
  const search = useSelector((state) => state.posts.search);

  const handleDeleteClose = useCallback(() => {
    setPost(null);
    setDelete(false);
  }, [setDelete, setPost]);

  const handleDeleteUser = useCallback(() => {
    dispatch(deletePost(post?.id));
    handleDeleteClose();
  }, [post, isDelete, dispatch]);

  useEffect(() => {
    if (postsStatus == "idle") {
      dispatch(getPosts());
    } 
  }, [postsStatus]);

  const navigate = useNavigate();

  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <div className="flex items-center gap-4">
        <AutocompleteSelect
          value={filter}
          onChange={(event, newValue) => {
            dispatch(filterPosts({filter: newValue, search: ""}))
          }}
          options={fullData}
          optionValue={(opt) => opt.id}
          optionLabel={(opt) => opt.title}
          label="Posts"
        />
        <TextField
          label="Type post title"
          value={search}
          onChange={(e) => {
            dispatch(filterPosts({filter: null, search: e.target.value}))

          }}
        />
      </div>
      <div className="w-full overflow-x-auto ">
        <div className="min-w-[1000px] lg:min-w-fit h-[70vh]">
          <DeleteModal
            handleClose={handleDeleteClose}
            title={`Are you sure to delete ${post?.title?.slice(0, 30)}...`}
            handleSubmit={handleDeleteUser}
            open={isDelete}
          />
          {postsStatus != "success" ? (
            <Loader />
          ) : (
            <Table
              head={
                <thead className="w-full sticky top-0 left-0 z-[2] bg-primary text-white text-[15px] font-semibold">
                  <tr className="border-b">
                    {postsTableHeaders?.map((item) => (
                      <th className="px-4 py-3" key={item.id}>
                        {item.name}
                      </th>
                    ))}
                  </tr>
                </thead>
              }
            >
              {data?.map((item, index) => (
                <tr key={item?.id} className="border-b ">
                  <td className="px-4 py-2">{item?.id}</td>
                  <td className="px-4 py-2">{item?.title}</td>
                  <td className="px-4 py-2">{item?.userId}</td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            navigate(`/posts/edit/${item.id}?view=true`)
                        }}
                      >
                        <MoreHorizIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            navigate(`/posts/edit/${item.id}`)
                        }}
                      >
                        <EditIcon />
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          setDelete(true);
                          setPost(item);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(paginatePosts({ page: page - 1, limit }));
              }}
              disabled={page == 1}
            >
              <NavigateNextIcon className="rotate-180" />
            </Button>
            <Typography>{page}</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(paginatePosts({ page: page + 1, limit }));
              }}
            >
              <NavigateNextIcon />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">limit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label="Age"
                onChange={(e) => {
                  dispatch(paginatePosts({ page: 1, limit: e.target.value }));
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={70}>70</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/posts/create");
          }}
        >
          {"Add post"}
        </Button>
      </div>
    </div>
  );
};

export default Posts;
