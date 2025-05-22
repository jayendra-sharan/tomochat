import { useContext } from "react";
import { SocketContext } from "../SocketProvider";

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context || !context.socket) {
    throw new Error("Socke is not available");
  }
  return context.socket;
};
