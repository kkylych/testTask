import { Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserInfoPage from "./pages/UserInfoPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="bg-[#F5EEDD] min-h-screen text-[#06202B] p-5">
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
