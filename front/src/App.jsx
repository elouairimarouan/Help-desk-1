import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NewTickets from "./pages/new-ticket";
import SignUp from "./pages/auth/signUp";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgotPassword";
import ConfirmPassword from "./pages/auth/confirmPassword";
import { Toaster } from "@/components/ui/sonner"
import NotFound from "./pages/not-found";
import { useSelector } from "react-redux";
import UserHome from "./pages/user-home";
import HomeAdmin from "./pages/home-admin";
import Users from "./pages/users";
import Tickets from "./pages/tickets";
import MyTickets from "./pages/my-tickets";
import Profile from "./pages/profile";
function App() {
  const {user } = useSelector((state) => state.auth); 
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
   <Toaster />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={user ? (user?.role == 1 ?<HomeAdmin />  : <UserHome />) : <Navigate to='/login' />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/new-tickets" element={user?.role == 1 ? <NewTickets />  : <Navigate to='/login' />} />
      <Route path="/tickets" element={user?.role == 1  ? <Tickets />  : <Navigate to='/login' />} />
      <Route path="/my-tickets" element={user?.role == 0 ? <MyTickets />  : <Navigate to='/login' />} />
      <Route path="/users" element={user?.role == 1 ? <Users /> : <Navigate to='/login' />}/>
      <Route path="*" element={<NotFound/>} />
      <Route path="/profile" element={user ? <Profile/> : <Navigate to='/login' /> } />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
 
  );
}

export default App;
