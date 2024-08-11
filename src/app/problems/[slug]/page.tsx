'use client';

import React, { useState } from 'react';
import type { NextPage } from "next";
import Editor from '@monaco-editor/react';

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

type Language = 'java' | 'cpp' | 'python';
const defaultComments: Record<Language, string> = {
  java: "// Java code here",
  cpp: "// C++ code here",
  python: "# Python code here",
};

const Page: NextPage = () => {
  const [language, setLanguage] = useState<Language>('java');
  const [editorContent, setEditorContent] = useState<string>(defaultComments.java);

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    setEditorContent(defaultComments[value]);
  };

  const options = {
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
              <TabsContent value="problem">Problem content here</TabsContent>
              <TabsContent value="editorial">Editorial content here</TabsContent>
              <TabsContent value="submissions">Submissions content here</TabsContent>
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
                <div className='w-full h-full'>
                  <Editor
                    height="100%"
                    width="100%"
                    language={language}
                    value={editorContent}
                    options={options}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/* Terminal */}
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Content</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;
