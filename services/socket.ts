import { io } from "socket.io-client";
import Constants from "expo-constants";
import { SocketEvents } from "./constants";

const SOCKET_ENDPOINT = Constants.expoConfig?.extra?.API_URL;

const socket = io(SOCKET_ENDPOINT, {
  transports: ["websocket"],
});

socket.on(SocketEvents.CONNECT, () => {
  console.log('CW-APP: Connected to BE socket server');
});

socket.on(SocketEvents.NEW_MESSAGE, (msg) => {
  console.log('CW-FE: New message', msg);
});

export default socket;
