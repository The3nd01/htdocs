import React, { useState } from 'react'; // Importa useState desde React
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './index.css';

// Importa tus componentes y páginas
import Header from './componentes/Header.jsx';
import Footer from './componentes/Footer.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Reservar from './pages/Reservar/Reservar.jsx';
import UserDetails from './pages/UserDetails/UserDetails.jsx';
import Calendario from './componentes/Calendario.jsx';

function AppLayout() {
  // Declara isLoggedIn y setIsLoggedIn utilizando useState

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/",
      element: <Home />,
    }]
  },
   {
     element: <AppLayout />,
     errorElement: <ErrorPage />,
     children: [{
      path: "/login",
       element: <Login />,
     }]
   },
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/register",
      element: <Register />,
    }]
  },
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/profile",
      element: <UserDetails />,
    }]
  }
  ,
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/calendar",
      element: <Calendario />,
    }]
  }
  ,
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/calendar/reservar/:id/:date",
      element: <Reservar />,
    }]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
