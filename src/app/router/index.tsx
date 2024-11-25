import { createBrowserRouter } from "react-router";

import { Layout } from '../../shared/ui';
import { Home, Login } from "../../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Layout />,
    children: [
      { 
        path: "/login", 
        element: <Login /> 
      },
    ]
  }
]);