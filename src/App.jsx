import { HashRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./Pages/login.jsx";
import RegisterPage from "./Pages/register.jsx";
import Mainpage from "./Pages/mainPage.jsx";
import PageTemplate from "./Pages/page.jsx";

import { UserProvider } from "./Provider/UserContext";

function App() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/page" element={<PageTemplate />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PageTemplate />} />
          <Route
            path="/dashboard"
            element={user ? <Layout /> : <LoginPage />}
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

function Layout() {
  return (
    <>
      <Mainpage />
    </>
  );
}

export default App;
