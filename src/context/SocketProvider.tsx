//{"response":{"output":"9\n","status":"SUCCESS"},"userId":"1","submissionId":"66c4770f29de9d0037b74dec"}
"use client";

import React, {
  useState,
  useCallback,
  useContext,
  createContext,
  useMemo,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  connectUser: () => void;
  fetchConnectionId: () => void;
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

  const connectUser = useCallback(() => {
    const userId = "1";
    console.log("Emitting set user id");
    socket.emit("setUserId", userId);
  }, [socket]);

  const fetchConnectionId = useCallback(() => {
    const userId = "1";
    console.log("Emitting get connection id");
    socket.emit("getConnectionId", userId);
  }, [socket]);
  console.log(fetchConnectionId);

  socket.on("connectionId", (data) => {
    setConnectionResponse(data || "No connection ID found");
  });

  socket.on("submissionPayloadResponse", (data) => {
    console.log(data);
    setSubmissionResponse(JSON.stringify(data));
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  const contextValue = useMemo(
    () => ({
      connectUser,
      fetchConnectionId,
      submissionResponse,
      connectionResponse,
    }),
    [connectUser, fetchConnectionId, submissionResponse, connectionResponse]
  );

  return (
    <socketContext.Provider value={contextValue}>
      {children}
    </socketContext.Provider>
  );
};
