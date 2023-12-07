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
import { memo, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../data/data.fn";

const EditUserModal = ({ open, setOpen, refetch, view, user, setUser, setView }) => {
  const [
    { city, country, email, name, phone, street, username, website },
    setState,
  ] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    city: "",
    country: "",
    phone: "",
    website: "",
  });

  const handleClose = () => {
    setOpen(false);
    setUser(null)
    setView(false)
    setState({
      name: "",
      username: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      country: "",
      website: "",
    });
  };

  useMemo(() => {
    if (user && open) {
      setState({
        name: user?.name,
        username: user?.username,
        email: user?.email,
        phone: user?.phone,
        street: user?.address?.street,
        city: user?.address?.city,
        country: user?.address?.country,
        website: user?.website,
      });
    }
  }, [open, view, user]);

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log(data, "asd");
      if (data?.status == 200 || data?.status == 201) {
        toast.success("User edited");
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
      const editedUser = {
        id: user?.id,
        name,
        phone,
        email,
        username,
        address: {
          country,
          city,
          street,
        },
        website,
      };

      mutate(editedUser);
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
        <DialogTitle id="alert-dialog-title">
          {view ? "View user" : "Edit user"}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <TextField
              fullWidth
              value={name}
              label={"Name*"}
              disabled={view}
              onChange={(e) => {
                setState((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
            <TextField
              fullWidth
              value={username}
              disabled={view}
              label={"Username*"}
              onChange={(e) => {
                setState((prev) => ({ ...prev, username: e.target.value }));
              }}
            />
            <TextField
              fullWidth
              value={email}
              disabled={view}
              label={"Email*"}
              type="email"
              onChange={(e) => {
                setState((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
            <TextField
              fullWidth
              value={phone}
              disabled={view}
              label={"Phone*"}
              type="tel"
              onChange={(e) => {
                setState((prev) => ({ ...prev, phone: e.target.value }));
              }}
            />
            <TextField
              fullWidth
              value={country}
              disabled={view}
              label={"Country*"}
              onChange={(e) => {
                setState((prev) => ({ ...prev, country: e.target.value }));
              }}
            />
            <TextField
              fullWidth
              value={city}
              disabled={view}
              label={"City*"}
              onChange={(e) => {
                setState((prev) => ({ ...prev, city: e.target.value }));
              }}
            />
            <TextField
              fullWidth
              value={street}
              disabled={view}
              label={"Street"}
              onChange={(e) => {
                setState((prev) => ({ ...prev, street: e.target.value }));
              }}
            />
            <TextField
              fullWidth
              value={website}
              disabled={view}
              label={"Website"}
              type="url"
              onChange={(e) => {
                setState((prev) => ({ ...prev, website: e.target.value }));
              }}
            />
          </div>
        </DialogContent>

        {view ? (
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Edit</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default memo(EditUserModal);
