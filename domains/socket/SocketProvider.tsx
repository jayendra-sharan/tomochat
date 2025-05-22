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

type SocketContextType = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
};

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined,
);

const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "SocketContext must be used inside valid children component",
    );
  }
  return context;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    const connect = async () => {
      const s = await initSocket();
      if (s) setSocket(s);
    };
    connect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
