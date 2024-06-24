import { RouterProvider } from "react-router-dom";
import AppProvider from "./main-provider";
import router from "./routes";
import { useCart, useTheme } from "@/hooks/useSaveToLocalStorage";

const AppRouter = () => {
  useTheme();
  useCart()
  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
