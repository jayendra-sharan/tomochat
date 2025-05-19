import { Socket, io } from "socket.io-client";
import Constants from "expo-constants";
import { SocketEvents } from "./socketEvents";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/domains/shared/types/socketEvents";

const SOCKET_ENDPOINT = Constants.expoConfig?.extra?.API_URL;

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_ENDPOINT,
  {
    transports: ["websocket"],
  },
);

socket.on(SocketEvents.CONNECT, () => {
  // @todo add logger here
  console.log("CW-APP: Connected to BE socket server");
});

export default socket;
