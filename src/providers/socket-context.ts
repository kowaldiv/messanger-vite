import { createContext, useContext } from "react";

interface SocketContextType {
  isConnected: boolean;
  socketId: string | null;
}

export const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  socketId: null,
});

export const useSocket = () => useContext(SocketContext);