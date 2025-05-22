import { useContext } from "react";
import { SocketContext } from "../SocketProvider";

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  return context?.socket;
};
