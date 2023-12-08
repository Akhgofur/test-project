import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createPost } from "../../../slices/posts";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: uuidv4(),
      title,
      body,
      userId: uuidv4(),
    };

    dispatch(createPost(newPost));
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
        />
        <TextField
          label="Post body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          rows={4}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreatePost;
