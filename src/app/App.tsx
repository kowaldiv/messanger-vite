import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "../router";
import { useUserStore } from "../stores/user-store";
import { SocketProvider } from "../providers/SocketProvider";

function App() {
  const userId = useUserStore((state) => state.id);

  return (
    <SocketProvider isAuthenticated={userId ? true : false}>
      <RouterProvider router={router} />
    </SocketProvider>
  );
}

export default App;
