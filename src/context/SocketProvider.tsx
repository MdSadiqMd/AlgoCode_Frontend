"use client";

import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";
/* import * as jose from 'jose'; */

interface SocketProviderProps {
  children?: React.ReactNode;
  userId?: string;
}

interface ISocketContext {
  submissionResponse: string;
  connectionResponse: string;
}

const socketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, userId }) => {
  const [socket] = useState<Socket>(() => io(process.env.NEXT_PUBLIC_SOCKET_SERVICE as string));
  const [connectionResponse, setConnectionResponse] = useState<string>("");
  const [submissionResponse, setSubmissionResponse] = useState<string>("");
  /* const token = userId;
  const secret = process.env.NEXT_PUBLIC_TOKEN_SECRET;

  const { payload } = await jose.jwtVerify(token as string, new TextEncoder().encode(secret as string));
  if (!token) throw new Error("Token not found");
  if (!secret) throw new Error("Token secret not found");
  const user = payload.id; */
  const user = "1";

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.emit("setUserId", user);
    socket.emit("getConnectionId", user);
    socket.on("connectionId", (data) => {
      console.log(data);
      setConnectionResponse(data);
    });
    socket.on("submissionPayloadResponse", (data) => {
      console.log(data);
      setSubmissionResponse(data);
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      submissionResponse,
      connectionResponse,
    }),
    [submissionResponse, connectionResponse]
  );

  return (
    <socketContext.Provider value={contextValue}>
      {children}
    </socketContext.Provider>
  );
};