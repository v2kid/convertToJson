import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"
import App from "./App"
import Gemini from "./page/Gemini"
export default function AppRouting(){
    
    const router = createBrowserRouter([
        {
          path: "/",
          element: <App />,
        },
        // other pages....
        {
          path: "/gemini",
          element: <Gemini />,
        },
      ])

      return (
        <RouterProvider router={router} />
    )
}