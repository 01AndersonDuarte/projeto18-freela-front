import { Route, Routes, BrowserRouter } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";

import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomeUserPage from "./pages/HomeUserPage/HomeUserPage";
import CreatePage from "./pages/CreatePage/CreatePage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/home-user/:id" element={<HomeUserPage />} />
          <Route path="/create-post" element={<CreatePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}