import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Router from "./Routes/Router";

function App() {
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
