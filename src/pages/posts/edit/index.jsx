import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createPost, editPost, getPosts } from "../../../slices/posts";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const [params, setParams] = useSearchParams();

  const isView = params.get("view");

  const fullData = useSelector((state) => state.posts.fullData);
  const dispatch = useDispatch();
  const postsStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postsStatus == "idle") {
      dispatch(getPosts());
    }   
  }, [postsStatus]);

  useEffect(() => {
    if (id && postsStatus == "success") {
      const current = fullData?.find((item) => item.id == id);
      setTitle(current?.title);
      setBody(current?.body);
    }
  }, [id, postsStatus]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const editedPost = {
      id,
      title,
      body,
    };

    dispatch(editPost(editedPost));
    navigate("/posts");
  };


  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <form
        className="flex flex-col gap-2 max-w-[400px]"
        onSubmit={handleFormSubmit}
      >
        <TextField
          label="Post title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isView == "true"}
        />
        <TextField
          label="Post body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isView == "true"}
          multiline
          rows={4}
        />
        {isView != "true" ? (
          <div className="flex items-center justify-end gap-4">
            <Button onClick={() => {navigate("/posts")}} type="button">Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => {
              navigate("/posts");
            }}
          >
            close
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditPost;
