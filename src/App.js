import './App.css';
import Login from './Pages/Login';
import Dashboard from './Pages/FavoritesList';
import { Route, Routes } from "react-router-dom";
import { ProtectRoutes } from './hooks/protectRoutes';
function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />

      <Route element={<ProtectRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
