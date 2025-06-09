import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { connectSocket, getSocket } from "./lib/socketService";
import { useInAppNotification } from "../notification/hooks/useInAppNotification";
import { useAuth } from "../auth/hooks/useAuth";
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../shared/types/socketEvents";

export type SocketType =
  | Socket<ServerToClientEvents, ClientToServerEvents>
  | undefined;

type SocketContextType = {
  socket: SocketType;
};

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("SocketContext must be used inside provider");
  }
  return context;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<SocketType>(undefined);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const setup = async () => {
      if (!isLoggedIn) return;
      const s = await connectSocket();
      if (s) setSocket(s);
    };
    setup();
  }, [isLoggedIn]);

  useInAppNotification(socket);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
