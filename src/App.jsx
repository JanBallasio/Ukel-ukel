import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Internal
import Home from "./pages/Home";
import PDF from "./pages/PDF";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/PDF",
    element: <PDF />,
  },
]);

function App() {
  return (
    <>
      <div >
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
