import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import Home from "./pages/home";
import NewTickets from "./pages/new-ticket";
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NewTickets />
    </ThemeProvider>
 
  );
}

export default App;
