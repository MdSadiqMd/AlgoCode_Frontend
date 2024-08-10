'use client';

import type { NextPage } from "next";
import Editor from '@monaco-editor/react';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

const Page: NextPage = () => {
    return (
        <div className="w-screen h-screen">
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Header</span>
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
