import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
  const {user } = useSelector((state) => state.auth);
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
   <Toaster />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={user ? (user?.role == 1 ?<HomeAdmin />  : <UserHome />) : <Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/new-tickets" element={user ? <NewTickets />  : <Login />} />
      <Route path="/tickets" element={user ? <Tickets />  : <Login />} />
      <Route path="/my-tickets" element={user ? <MyTickets />  : <Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
 
  );
}

export default App;
