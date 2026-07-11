import { io, Socket } from "socket.io-client";
import { BACKEND_API } from "../config/backend.api";
import type { ClientToServerEvents, ServerToClientEvents } from "./events";

const SOCKET_URL = BACKEND_API || "http://localhost:3000";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_URL,
  {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: false,
  },
);

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
