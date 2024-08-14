import axios from "axios";

import { ExecuteCodeResponse } from "@/types/output.types";

export const executeCode = async (
  language: string,
  sourceCode: string
): Promise<ExecuteCodeResponse> => {
  const response = await axios.post("http://localhost:8080/api/v1/submissions", {
    code: sourceCode,
    language: language,
userId: "1",
    problemId: "669cd25d2174227a4b9c6a4d",
  });
  return response.data;
};
