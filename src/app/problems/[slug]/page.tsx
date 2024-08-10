'use client';

import type { NextPage } from "next";
import Editor from '@monaco-editor/react';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page: NextPage = () => {
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
                <ResizablePanel>
                    <ResizablePanelGroup direction="vertical" className="h-full w-full">
                        <ResizablePanel defaultSize={70}>
                            <div className="flex h-full items-center justify-center p-6">
                                <div className='w-full h-full'>
                                    <Editor
                                        height="100%"
                                        width="100%"
                                        defaultLanguage="javascript"
                                        defaultValue="// some comment"
                                        options={options}
                                    />
                                </div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
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
