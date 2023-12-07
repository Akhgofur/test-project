import React, { memo, useCallback, useMemo, useState } from "react";
import Table from "../../components/table";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteModal from "../../components/delete-modal";
import { usersTableHeaders } from "../../utils/consts";
import { useUsers } from "../../data/data.service";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../data/data.fn";
import { toast } from "react-toastify";
import CreateUserModal from "../../components/create-user-modal";
import EditUserModal from "../../components/edit-user-modal";
import { getLocalPagination } from "../../utils/functions";

const Users = () => {
  const { data, isLoading, refetch } = useUsers();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [currentUser, setCurrentUser] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);

  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (data) {
      if (filter) {
        const array = data?.filter((item) => item?.name == filter?.name);
        return getLocalPagination(array, limit, page);
      } else if (search) {
        const array = data?.filter((item) =>
          item?.name?.toLowerCase()?.includes(search?.toLowerCase())
        );

        return getLocalPagination(array, limit, page);
      }
      return getLocalPagination(data, limit, page);
    }
    return [];
  }, [filter, data, search, limit, page]);

  const handleDeleteClose = useCallback(() => {
    setDelete(false);
    setCurrentUser(null);
  }, [setDelete, setCurrentUser]);

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    mutationKey: ["users/delete"],
    onSuccess: (data) => {
      console.log(data);
      if (data?.status == 200) {
        toast.success("Deleted successfully");
        handleDeleteClose();
        refetch();
      } else {
        toast.error("Error occured please try again");
      }
    },
    onError: () => {
      toast.error("Error occured please try again");
    },
  });

  const handleDeleteUser = useCallback(() => {
    mutate(currentUser?.id);
  }, [currentUser, isDelete]);

  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <div className="flex items-center gap-4">
        <Autocomplete
          getOptionKey={(opt) => opt.id}
          disablePortal
          value={filter}
          onChange={(event, newValue) => {
            console.log(newValue);
            setSearch("");
            setFilter(newValue);
          }}
          id="combo-box-demo"
          options={data ?? []}
          getOptionLabel={(opt) => opt.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="User" />}
        />
        <TextField
          label="Type user name"
          value={search}
          onChange={(e) => {
            setFilter(null);
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="w-full overflow-x-auto ">
        <div className="min-w-[1000px] lg:min-w-fit h-[70vh]">
          <DeleteModal
            handleClose={handleDeleteClose}
            title={`Are you sure to delete ${currentUser?.name}`}
            handleSubmit={handleDeleteUser}
            open={isDelete}
          />
          <CreateUserModal
            open={create}
            refetch={refetch}
            setOpen={setCreate}
          />
          <EditUserModal
            open={edit}
            refetch={refetch}
            setOpen={setEdit}
            setUser={setCurrentUser}
            setView={setView}
            user={currentUser}
            view={view}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <Table head={usersTableHeaders}>
              {filteredData?.map((item, index) => (
                <tr key={item?.id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item?.name}</td>
                  <td className="px-4 py-2">{item?.phone}</td>
                  <td className="px-4 py-2">{item?.email}</td>
                  <td className="px-4 py-2">{item?.address?.country}</td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setCurrentUser(item);
                          setEdit(true);
                          setView(true);
                        }}
                      >
                        <MoreHorizIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setCurrentUser(item);
                          setEdit(true);
                        }}
                      >
                        <EditIcon />
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          setDelete(true);
                          setCurrentUser(item);
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
                setPage((prev) => prev - 1);
              }}
              disabled={page == 1}
            >
              <NavigateNextIcon className="rotate-180" />
            </Button>
            <Typography>{page}</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setPage((prev) => prev + 1);
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
                  setLimit(e.target.value);
                  setPage(1);
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
            setCreate(true);
          }}
        >
          {"Add user"}
        </Button>
      </div>
    </div>
  );
};

export default memo(Users);
