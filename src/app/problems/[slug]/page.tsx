"use client";

import React, { useState, useRef, useEffect } from "react";
import type { NextPage } from "next";
import Editor from "@monaco-editor/react";
import { editor as MonacoEditor } from "monaco-editor";
import DOMPurify from "dompurify";
import axios from "axios";
import { useTheme } from 'next-themes';

import { useSocket } from "@/context/SocketProvider";
import { ExecuteCodeResponse } from "@/types/output.types";
import { executeCode } from "@/lib/execute";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import ProbDes from "@/components/problem-description";

import { hatch, grid } from 'ldrs'
hatch.register()
grid.register()

type Language = "java" | "cpp" | "python";

interface CodeSnippets {
  [key: string]: string;
}

interface PageProps {
  params: { slug: string; };
}

const Page: NextPage<PageProps> = ({ params }) => {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<Language>("java");
  const [editorContent, setEditorContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippets>({});
  const [descriptionData, setDescriptionData] = useState<any>(null);
  const { submissionResponse, connectionResponse } = useSocket();
  const { theme } = useTheme();

  const SuccessResponseData = {
    "response": {
      "output": "64\n",
      "status": "SUCCESS"
    },
    "userId": "1",
    "submissionId": "66d2e42a56a8a460c2a479b8"
  };
  const ErrorReponseData = {
    "response": {
      "output": "  File \"test.py\", line 10\n    if _name_ == \"_main_\\\":\n                              ^\nSyntaxError: EOL while scanning string literal\n",
      "status": "ERROR"
    },
    "userId": "1",
    "submissionId": "66d2e44656a8a460c2a479ba"
  };

  const fetchDescriptionText = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PROBLEM_SERVICE}/api/v1/problems/${params.slug}`
      );
      setDescriptionData(response.data.data);
    } catch (error: any) {
      throw new Error('Error in fetching Problem Description text', error)
    }
  };

  useEffect(() => {
    const getDescriptionText = async () => {
      await fetchDescriptionText();
    };
    getDescriptionText();
  }, [params.slug]);

  useEffect(() => {
    if (descriptionData) {
      const sanitizedText = DOMPurify.sanitize(JSON.stringify(descriptionData, null, 2));
      setDescriptionText(sanitizedText);
      setCodeSnippets({
        java: descriptionData.codeStubs.find((stub: any) => stub.language === "JAVA")?.userSnippet || "",
        cpp: descriptionData.codeStubs.find((stub: any) => stub.language === "CPP")?.userSnippet || "",
        python: descriptionData.codeStubs.find((stub: any) => stub.language === "PYTHON")?.userSnippet || "",
      });
      setEditorContent(descriptionData.codeStubs.find((stub: any) => stub.language === "JAVA")?.userSnippet || "");
    }
  }, [descriptionData]);

  const onMount = (editor: MonacoEditor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    setEditorContent(codeSnippets[value]);
  };

  const runCode = async () => {
    if (!editorRef.current || !descriptionData) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const result: ExecuteCodeResponse = await executeCode(language, sourceCode, descriptionData._id);
      // console.log(result)
      setIsError(!!result.stderr);
    } catch (error: any) {
      throw new Error("Error during code execution: ", error)
    } finally {
      setIsLoading(false);
    }
  };

  const submitCode = async () => {
    if (!editorRef.current || !descriptionData) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    // console.log("Submit code:", { sourceCode, editorContent }, sourceCode === editorContent);

    if (sourceCode !== editorContent) {
      localStorage.setItem(`${Date.now()} - ${language} - ${params.slug}`, sourceCode)
    } else if (sourceCode === editorContent) {
      localStorage.removeItem(`${Date.now()} - ${language} - ${params.slug}`)
    }
  };

  const options: MonacoEditor.IEditorOptions = {
    readOnly: false,
    minimap: { enabled: false },
  };

  const getCodeFromLocalStorage = localStorage.getItem(`${Date.now()} - ${language} - ${params.slug}`)
  const finalCodeShown = ((getCodeFromLocalStorage === null) ? editorContent : getCodeFromLocalStorage)

  return (
    <>
      <Navbar />
      <div className="w-screen h-nav_fixer pt-30 mt-20">
        {
          descriptionData === null ? <div className="h-full w-full flex flex-col justify-center items-center">
            <l-grid
              size="150"
              speed="1.5"
              color={`${theme === "dark" ? "white" : "black"}`}
            ></l-grid>
          </div> :
            <ResizablePanelGroup
              direction="horizontal"
              className="h-full w-full rounded-lg border"
            >
              {/* Tabs */}
              <ResizablePanel defaultSize={50}>
                <div className="h-full w-full p-6 overflow-y-auto">
                  <Tabs defaultValue="problem" className="w-[275px] h-full">
                    <TabsList className="flex items-start justify-start">
                      <TabsTrigger value="problem">Problem</TabsTrigger>
                      <TabsTrigger value="editorial">Editorial</TabsTrigger>
                      <TabsTrigger value="submissions">Submissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="problem">
                      <ProbDes descriptionText={descriptionText} />
                      Problem Content here
                    </TabsContent>
                    <TabsContent value="editorial">
                      Editorial content here
                    </TabsContent>
                    <TabsContent value="submissions">
                      Submissions content here
                    </TabsContent>
                  </Tabs>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              {/* Editor */}
              <ResizablePanel>
                <ResizablePanelGroup direction="vertical" className="h-full w-full">
                  <ResizablePanel defaultSize={70}>
                    <div className="flex flex-col h-full items-start justify-center p-3">
                      <div className="w-full mb-1.5">
                        <Select value={language} onValueChange={handleLanguageChange}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="cpp">Cpp</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full h-full">
                        <Editor
                          height="100%"
                          width="100%"
                          theme={theme === 'dark' ? 'vs-dark' : 'light'}
                          language={language}
                          onMount={onMount}
                          value={finalCodeShown}
                          options={options}
                        />
                      </div>
                      <div className="w-full flex justify-end space-x-2 mt-2 mr-2">
                        {
                          isLoading ? <l-hatch
                            size="25"
                            stroke="4"
                            speed="3.5"
                            color={`${theme === "dark" ? "white" : "black"}`}
                          ></l-hatch> : <Button variant="secondary" onClick={runCode}>
                            Run
                          </Button>
                        }
                        <Button onClick={submitCode}>Submit</Button>
                      </div>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  {/* Terminal */}
                  <ResizablePanel defaultSize={30}>
                    <div className="flex h-full flex-col items-center justify-center p-6">
                      <span className="font-semibold">
                        <pre>{JSON.stringify(submissionResponse, null, 2)}</pre>
                        {/* <pre>{JSON.stringify(SuccessResponseData)}</pre> */}
                        {/* <pre>{JSON.stringify(ErrorReponseData)}</pre> */}
                      </span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
        }
      </div>
    </>
  );
};

export default Page;