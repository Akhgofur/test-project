import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import { Suspense, lazy } from "react";
import Loader from "./components/loader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const Users = lazy(() => import("./pages/users"));

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact Component={Users} path={"/"} />
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
