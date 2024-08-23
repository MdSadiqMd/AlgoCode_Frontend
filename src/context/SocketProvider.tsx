//{"response":{"output":"9\n","status":"SUCCESS"},"userId":"1","submissionId":"66c4770f29de9d0037b74dec"}
"use client";

import React, {
  useState,
  useCallback,
  useContext,
  createContext,
  useMemo,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
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

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket] = useState<Socket>(() => io("http://localhost:3001"));
  const [connectionResponse, setConnectionResponse] = useState<string>("");
  const [submissionResponse, setSubmissionResponse] = useState<string>("");
  const userId = "1";

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.emit("setUserId", userId);
    socket.emit("getConnectionId", userId);
    socket.on("connectionId", (data) => {
      console.log(data)
      setConnectionResponse(data)
    });
    socket.on("submissionPayloadResponse", (data) => {
      console.log(data)
      setSubmissionResponse(data)
    });
  }, [])

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
