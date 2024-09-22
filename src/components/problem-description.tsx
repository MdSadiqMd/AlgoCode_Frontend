"use client"

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ProblemData {
    title: string;
    description: string;
}

export default function ProbDescription(props: { descriptionText: string }) {
    const { descriptionText } = props
    let problemData: ProblemData;

    try {
        problemData = JSON.parse(descriptionText);
    } catch (error) {
        // console.log("Failed to parse descriptionText:", error);
        problemData = { title: "Error", description: "Failed to load ." };
    }

    return (
        <>
            <h1 className="text-3xl">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose w-full">
                    {`${(problemData.title)}`}
                </ReactMarkdown>
            </h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose">
                {problemData.description}
            </ReactMarkdown>
        </>
    )
}