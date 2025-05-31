import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../shared/types/socketEvents";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { initSocket } from "./lib/socketService";
import { useInAppNotification } from "../notification/hooks/useInAppNotification";
import { useAuth } from "../auth/hooks/useAuth";

export type SocketType =
  | Socket<ServerToClientEvents, ClientToServerEvents>
  | undefined;

type SocketContextType = {
  socket: SocketType;
};

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "SocketContext must be used inside valid children component"
    );
  }
  return context;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<SocketType>(undefined);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const connect = async () => {
      const s = await initSocket();
      if (s) setSocket(s);
    };
    connect();
  }, [isLoggedIn]);

  useInAppNotification(socket);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
