import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense, useEffect } from "react";
import Router from "./Routes/Router";
import { fetchAuthenticatedUser } from "./redux/slice/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthenticatedUser());
  }, []);
  return (
    <BrowserRouter>
      <Suspense>
        <Router />
      </Suspense>
      <ToastContainer position="bottom-right" autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;
