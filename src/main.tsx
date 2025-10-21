// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { BrowserRouter } from "react-router-dom"
// import { Toaster } from 'sonner'

// createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//     <App />
//     <Toaster position="top-right" richColors /> 
//   </BrowserRouter>,
// )
import { createRoot } from "react-dom/client";
import "./index.css";
// import Router from "./routes/route.tsx";
import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AppRoutes />
  </QueryClientProvider>
);
