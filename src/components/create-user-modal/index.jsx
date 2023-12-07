import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../../data/data.fn";

const CreateUserModal = ({ open, setOpen, refetch }) => {
  const [{
    city,
    country,
    email,
    name,
    phone,
    street,
    username,
    website
  }, setState] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    city: "",
    country: "",
    phone: "",
    website: ""
  });

  const handleClose = () => {
    setOpen(false);
    setState({
        name: "",
        username: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        country: "",
        website: ""
      })
  };

  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      if (data?.status == 200 || data?.status == 201) {
        toast.success("User created");
        refetch();
        handleClose();
        return;
      } else {
        toast.error("Error occured");
      }
    },
    onError: (err) => {
      toast.error("Error occured");
    },
  });

  const handleSubmit = () => {
    if (name && phone && email && username && country && city) {
        const newUser = {
            id: uuidv4(),
            name,
            phone,
            email,
            username,
            address : {
                country,
                city,
                street
            },
            website
        }
        
      mutate(newUser);
    } else {
      toast.error("Fill required fields");
    }
  };

  return (
    <div className="">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Create user</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <TextField
              fullWidth
              value={name}
              label={"Name*"}
              onChange={(e) => {
                setState(prev => ({...prev, name: e.target.value}));
              }}
            />
            <TextField
              fullWidth
              value={username}
              label={"Username*"}
              onChange={(e) => {
                setState(prev => ({...prev, username: e.target.value}));
              }}
            />
            <TextField
              fullWidth
              value={email}
              label={"Email*"}
              type="email"
              onChange={(e) => {
                setState(prev => ({...prev, email: e.target.value}));
              }}
            />
            <TextField
              fullWidth
              value={phone}
              label={"Phone*"}
              type="tel"
              onChange={(e) => {
                setState(prev => ({...prev, phone: e.target.value}));
              }}
            />
            <TextField
              fullWidth
              value={country}
              label={"Country*"}
              onChange={(e) => {
                setState(prev => ({...prev, country: e.target.value}));
              }}
            />
            <TextField
              fullWidth
              value={city}
              label={"City*"}
              onChange={(e) => {
                setState(prev => ({...prev, city: e.target.value}));
              }}
            />
            <TextField
              fullWidth
              value={street}
              label={"Street"}
              onChange={(e) => {
                setState(prev => ({...prev, street: e.target.value}));
              }}
            />
            <TextField
              fullWidth
              value={website}
              label={"Website"}
              type="url"
              onChange={(e) => {
                setState(prev => ({...prev, website: e.target.value}));
              }}
            />
           
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(CreateUserModal);
