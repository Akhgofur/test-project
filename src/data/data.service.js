import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./data.fn";


// USERS

export const useUsers = () => useQuery({queryFn: getUsers, queryKey: ["users"]})