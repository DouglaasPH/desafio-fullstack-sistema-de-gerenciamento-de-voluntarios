import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index />
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
