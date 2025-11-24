// react-dom
import { createRoot } from "react-dom/client";

// App
import App from "./App.tsx";

// tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// css
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
