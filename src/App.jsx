import "./App.css";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import Layout from "./layout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { router } from "./routes";



const App = () => {
  const content = useRoutes(router)
  return (
      <>
      <Layout>
        {content}
      </Layout>
      <ToastContainer autoClose={2000} />
      </>
   
  );
};

export default App;
