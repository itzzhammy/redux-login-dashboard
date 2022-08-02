import { Route, Routes, Navigate } from "react-router";
import './App.css';
import DashboardView from "./views/DashboardView";
import LoginView from "./views/LoginView";
import CountryView from "./views/CountryView";
import { useSelector } from "react-redux";
import { selectUser } from "./reducers/userSlice";
import TemporaryDrawer from "./components/atomicComponents/SideBar";

function App() {
  const user = useSelector(selectUser);

  return (
    <div className="App">
      <TemporaryDrawer />
      <Routes>
        <Route
          path="/"
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginView />
            )
          }
        />
        <Route
          path="/login"
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginView />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <DashboardView />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/country"
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <CountryView />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          exact={true}
          element={
            user.isLoggedin && user.data.length > 0 ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
