import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register";
import UrlShoter from "./Pages/urlShoter";
import { UserProvider } from "./Provider/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}
function ProtectedRoute() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user || !user.email || !user.name || !user._id || !user.token) {
    return <Navigate to="/login" />;
  } else {
    return <Layout />;
  }
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
