/* eslint-disable react/prop-types */
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register";
import UrlShoter from "./Pages/urlShoter";
import { UserProvider } from "./Provider/UserContext";

function App() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={user ? <Layout /> : <LoginPage />}
            />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <UrlShoter />
      </div>
    </>
  );
}

export default App;
