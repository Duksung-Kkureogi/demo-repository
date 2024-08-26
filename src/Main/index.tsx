import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../Presentation/UI/Pages/MainPage";
import LoginPage from "../Presentation/UI/Pages/LoginPage";
import StorePage from "../Presentation/UI/Pages/StorePage";
import { AuthProvider } from "../services/AuthContext";
import WebSocketTestPage from "../Presentation/UI/Pages/WebSocketTestPage";
import AcidPage from "../Presentation/UI/Pages/AcidPage";
import AuthGuardLayout from "../Presentation/UI/Components/AuthGuard";
import QuestStartPage from "../Presentation/UI/Pages/QuestStartPage";
import ThreeDModelPage from "../Presentation/UI/Pages/ThreeDModelPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/store",
    element: <StorePage />,
  },
  {
    path: "/websocket-test/real-time-quiz",
    element: <WebSocketTestPage />,
  },
  {
    path: "/quest",
    element: <QuestStartPage />,
  },
  {
    path: "/3d-model",
    element: <ThreeDModelPage />,
  },
  {
    path: "/websocket-test/acidrain/:logId?",
    element: (
      <AuthGuardLayout>
        <AcidPage />
      </AuthGuardLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
