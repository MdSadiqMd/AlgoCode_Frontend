"use client";

import React, { useState, useRef, useEffect } from "react";
import type { NextPage } from "next";
import Editor, { useMonaco } from "@monaco-editor/react";
import { editor as MonacoEditor } from "monaco-editor";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import rehypeRaw from "rehype-raw";
import axios from "axios";

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

type Language = "java" | "cpp" | "python";

const defaultComments: Record<Language, string> = {
  java: "// Java code here",
  cpp: "// C++ code here",
  python: "# Python code here",
};

const Page: NextPage = () => {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<Language>("java");
  const [editorContent, setEditorContent] = useState<string>(
    defaultComments.java
  );
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] = useState<string>("");

  const fetchDescriptionText = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/problems/669cd25d2174227a4b9c6a4d"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return "";
  };

  useEffect(() => {
    const getDescriptionText = async () => {
      const text = await fetchDescriptionText();
      const sanitizedText = DOMPurify.sanitize(text);
      setDescriptionText(sanitizedText);
    };
    getDescriptionText();
  }, []);

  const onMount = (editor: MonacoEditor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    setEditorContent(defaultComments[value]);
  };

  const runCode = async () => {
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    console.log("sourceCode: ", sourceCode);

    try {
      setIsLoading(true);
      const result: ExecuteCodeResponse = await executeCode(
        language,
        sourceCode
      );
      setOutput(result.stdout.split("\n"));
      setIsError(!!result.stderr);
    } catch (error: any) {
      console.error("Error during code execution: ", error);
      setOutput(["Error during code execution"]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitCode = () => {
    console.log("Submit code");
  };

  const options: MonacoEditor.IEditorOptions = {
    readOnly: false,
    minimap: { enabled: false },
  };

  return (
    <div className="w-screen h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        {/* Tabs */}
        <ResizablePanel defaultSize={50}>
          <div className="h-full w-full p-6">
            <Tabs defaultValue="problem" className="w-[275px] h-full">
              <TabsList className="flex items-start justify-start">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="editorial">Editorial</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
              <TabsContent value="problem">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose">
                    {descriptionText}
                  </ReactMarkdown>
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
                    language={language}
                    onMount={onMount}
                    value={editorContent}
                    options={options}
                  />
                </div>
                <div className="w-full flex justify-end space-x-2 mt-2 mr-2">
                  <Button variant="secondary" onClick={runCode}>
                    Run
                  </Button>
                  <Button onClick={submitCode}>Submit</Button>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/* Terminal */}
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full flex-col items-center justify-center p-6">
                <span className="font-semibold">Output</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;
