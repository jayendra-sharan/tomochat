import { io, Socket } from "socket.io-client";
import Constants from "expo-constants";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/domains/shared/types/socketEvents";
import { storage } from "@/services/storage";
import { AUTH_TOKEN } from "@/constants";
import { SocketEvents } from "@/domains/socket/events";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

const SOCKET_ENDPOINT = Constants.expoConfig?.extra?.API_URL;

export const getSocket = () => socket;

export const connectSocket = async (): Promise<Socket | null> => {
  if (socket && socket.connected) {
    console.log("Socket already connected");
    return socket;
  }

  const token = await storage.getItem(AUTH_TOKEN);
  if (!token) {
    console.log("No token — cannot connect socket");
    return null;
  }

  if (!SOCKET_ENDPOINT) {
    console.log("No SOCKET_ENDPOINT — check env");
    return null;
  }

  if (!socket) {
    socket = io(SOCKET_ENDPOINT, {
      transports: ["websocket"],
      auth: { token },
    });

    socket.on(SocketEvents.CONNECT, () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on(SocketEvents.DISCONNECT, () => {
      console.log("Socket disconnected");
    });
  } else {
    socket.auth = { token };
    socket.connect(); // reconnect with new token if needed
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket manually disconnected");
  }
};
