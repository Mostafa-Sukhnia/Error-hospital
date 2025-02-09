import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./pages/App";
import Home from "./Router/Home";
import SignIn from "./Router/signIn";
import SignUp from "./Router/signUp";
import ProtectedPages from "./Router/ProtectedPages";
import BookPostaiation from "./Router/BookPostaiation.js";
import Admin from "./pages/Admin.jsx";
import ProtectedAdmin from "./Router/ProtectedAdmin.js";
import AddDoctor from "./Router/AddDoctor.jsx";
import AdminHome from "./Router/AdminHome.jsx";
import OutLet from "./Router/OutLet.jsx";
import DoctorsAndAppointments from "./Router/DoctorsAndAppointments.jsx";
import Doctor from "./Router/doctor.jsx";
import FindDoctor from "./pages/FindDoctor.jsx";
import BookAnAppointment from "./Router/BookAnAppointment.jsx";
import store from "./store/store.js";
import About from "./Router/about.jsx";
import Contact from "./Router/contact.jsx";
import PageNotFound from './Router/Error.jsx'

const container = document.getElementById("root");
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
     
          <Home />

      ),
      },
      {
        path: "*",
        element: <PageNotFound/>,
      },
      {
        path: "BookPosition",
        element: (
          <ProtectedPages>
            <BookPostaiation />
          </ProtectedPages>
        ),
      },
      {
        path: "contact",
        element: (
        
            <Contact />
         
        ),
      },
      {
        path: "about",
        element: (
          
            <About />
          
        ),
      },
      {
        path: "find-doctor",
        element: (
          <ProtectedPages>
            <OutLet />
          </ProtectedPages>
        ),
        children: [
          {
            path: "",
            element: (
              <ProtectedPages>
                <FindDoctor />
              </ProtectedPages>
            ),
          },
          {
            path: "bookAnAppointment/:id",
            element: <BookAnAppointment />,
          },
        ],
      },
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "admin",
    element: <AdminHome />,
    children: [
      {
        path: "",
        element: (
          <ProtectedAdmin>
            <Admin />
          </ProtectedAdmin>
        ),
      },
      {
        path: "addDoc",
        element: <AddDoctor />,
      },
      {
        path: "doctors",
        element: <OutLet />,
        children: [
          {
            path: "",
            element: <DoctorsAndAppointments />,
          },
          {
            path: "doctorAppointments/:id",
            element: <Doctor />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
   <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
