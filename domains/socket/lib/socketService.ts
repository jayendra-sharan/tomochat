import { io, Socket } from "socket.io-client";
import Constants from "expo-constants";

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/domains/shared/types/socketEvents";
import { storage } from "@/services/storage";
import { AUTH_TOKEN } from "@/constants";
import { SocketEvents } from "@/domains/socket/events";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
const SOCKET_ENDPOINT = Constants.expoConfig?.extra?.API_URL;
console.log("DEBUG ---- SOCKET END POINT", SOCKET_ENDPOINT);

export async function initSocket(): Promise<typeof socket> {
  const token = await storage.getItem(AUTH_TOKEN);
  if (!token) {
    console.log(
      "Token not found, cannot initialise socket for unauthorised users"
    );
    return;
  }

  socket = io(SOCKET_ENDPOINT, {
    transports: ["websocket"],
    auth: {
      token,
    },
  });

  socket.on(SocketEvents.CONNECT, () => {
    console.log("Socket connected: ", socket?.id);
  });

  socket.on(SocketEvents.DISCONNECT, () => {
    console.log("Socket disconnected.");
  });

  return socket;
}

export function getSocket() {
  return socket;
}

// @todo write a logger utility
