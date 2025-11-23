// react
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// routes
import Dashboard from "./pages/Dashboard/Dashboard";
import NewVolunteer from "./pages/NewVolunteer/NewVolunteer";
import UpdateVolunteerPage from "./pages/UpdateVolunteer/UpdateVolunteer";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Dashboard />} />
      <Route path="new-volunteer" element={<NewVolunteer />} />
      <Route
        path="update-volunteer/:volunteer_id"
        element={<UpdateVolunteerPage />}
      />
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
