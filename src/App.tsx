// react
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// routes
import Dashboard from "./pages/Dashboard/Dashboard";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Dashboard />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
