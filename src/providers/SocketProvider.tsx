import { useEffect, useRef, useState, type ReactNode } from "react";
import { SocketContext } from "./socket-context";
import { socket, connectSocket, disconnectSocket } from "../socket-io/client";
import { useChatSocketEvents } from "../hooks/useChatSocketEvents";
import { useMessageSocketEvents } from "../hooks/useMessageSocketEvents";

interface Props {
  children: ReactNode;
  isAuthenticated: boolean;
}

export function SocketProvider({ children, isAuthenticated }: Props) {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState<string | null>(null);
  const isConnectedRef = useRef(false);

  useChatSocketEvents();
  useMessageSocketEvents();

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectSocket();
      return;
    }

    if (!isConnectedRef.current) {
      connectSocket();
      isConnectedRef.current = true;
    }

    const handleConnect = () => {
      setIsConnected(true);
      setSocketId(socket.id ?? null);
      console.log("✅ Socket connected:", socket.id);
      socket.emit("joinAllChats");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setSocketId(null);
      console.log("❌ Socket disconnected");
    };

    const handleError = (err: Error) => {
      setIsConnected(false);
      console.error("⚠️ Socket connection error:", err.message);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);

    if (socket.connected) {
      handleConnect();
    }

    // Cleanup
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ isConnected, socketId }}>
      {children}
    </SocketContext.Provider>
  );
}
