import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Landing } from "./pages/Landing";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import { Appointments } from "./pages/Appointments";
import { Toaster } from "@/components/ui/toaster";
import { Apply } from "./pages/Apply";

function App() {
  const token = localStorage.getItem("token");

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {!token ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/appointments"
              element={
                <Layout>
                  <Appointments />
                </Layout>
              }
            />
            <Route
              path="/apply"
              element={
                <Layout>
                  <Apply />
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
