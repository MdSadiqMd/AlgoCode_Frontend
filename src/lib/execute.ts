"use server";

import axios from "axios";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { ExecuteCodeResponse } from "@/types/output.types";

async function getUser() {
  const tokenCookie = cookies().get("token");
  //console.log(tokenCookie);
  const token = tokenCookie?.value;

  if (!token) {
    //console.error("Token not found");
    throw new Error("Token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    //console.log("Decoded token:", decoded);
    return decoded as { id: string; };
  } catch (error) {
    //console.error("Error decoding token:", error);
    throw new Error("Invalid token");
  }
}

export const executeCode = async (
  language: string,
  sourceCode: string
): Promise<ExecuteCodeResponse> => {
  try {
    const user = await getUser();
    const userId = user.id;

    const response = await axios.post("http://localhost:8080/api/v1/submissions", {
      code: sourceCode,
      language: language,
      userId: userId,
      problemId: "669cd25d2174227a4b9c6a4d",
    });
    return response.data;
  } catch (error) {
    console.error("Error in executeCode:", error);
    throw error;
  }
};
