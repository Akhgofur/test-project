import { Suspense, lazy } from "react";
import Loader from "../components/loader";
import Posts from "../pages/posts";

const SuspenseLoader = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const Users = SuspenseLoader(lazy(() => import("../pages/users")));
const CreatePost = SuspenseLoader(lazy(() => import("../pages/posts/create")));
const EditPost = SuspenseLoader(lazy(() => import("../pages/posts/edit")));

export const router = [
  {
    path: "",
    name: "Users",
    children: [{ path: "", name: "Users", element: <Users /> }],
  },
  {
    path: "posts",
    name: "Posts",
    children: [
      {
        path: "",
        element: <Posts />,
        name: "Posts",
        index: true,
      },
      {
        path: "create",
        element: <CreatePost />,
        name: "Create post",
      },
      {
        path: "edit/:id",
        element: <EditPost />,
        // name: "Create post",
      },
    ],
  },
];
