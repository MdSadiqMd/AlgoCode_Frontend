"use server";

import axios from "axios";
/* import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; */

import { ExecuteCodeResponse } from "@/types/output.types";

/* async function getUser() {
  const tokenCookie = cookies().get("token");
  console.log("tokenCookie",tokenCookie);
  const token = tokenCookie?.value;

  if (!token) {
    console.error("Token not found");
    throw new Error("Token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET as string);
    console.log("Decoded token:", decoded);
    return decoded as { id: string; };
  } catch (error) {
    console.error("Error decoding token:", error);
  }
} */

export const executeCode = async (
  language: string,
  sourceCode: string,
  problemId: string
): Promise<ExecuteCodeResponse> => {
  try {
    /* const user = await getUser();
    if (!user || !user.id) {
      throw new Error("User ID not found");
    }
    const userId = user.id; */
    const userId = "1";

    const response = await axios.post(`${process.env.NEXT_PUBLIC_SUBMISSION_SERVICE as string}/api/v1/submissions`, {
      code: sourceCode,
      language: language,
      userId: userId,
      problemId: problemId,
    });
    return response.data;
  } catch (error) {
    console.error("Error in executeCode:", error);
    throw error;
  }
};