import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/admin/login"
          element={<Login />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
