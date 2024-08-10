import type { NextPage } from "next";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

const Page: NextPage = () => {
    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[300px] max-w-md rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Header</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <ResizablePanelGroup direction="vertical" className="h-full">
                        <ResizablePanel defaultSize={50}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Content</span>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={50}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Content</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
};

export default Page;