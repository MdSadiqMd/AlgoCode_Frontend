"use client";

import type { NextPage } from "next";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";

import columns from "./columns";
import DataTable from "./data-table";
import Navbar from "@/components/ui/navbar";

const Page: NextPage = () => {
    const [datas, setDatas] = useState<Array<{ status: string; title: string; acceptance: number; difficulty: string; }>>([]);

    const fetchProblems = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_PROBLEM_SERVICE}/api/v1/problems`
            );
            return response.data.data;
        } catch (error) {
            console.error("Error fetching problems:", error);
            return [];
        }
    };

    const cleanTitle = (title: string): string => {
        let trimmedTitle = title.trim();
        while (trimmedTitle.startsWith("#")) {
            trimmedTitle = trimmedTitle.slice(1).trim();
        }
        return trimmedTitle;
    };

    const formatAcceptance = (acceptance: any): number => {
        if (acceptance && typeof acceptance === 'object' && '$numberDecimal' in acceptance) {
            return parseFloat(acceptance.$numberDecimal);
        }
        return 0;
    };

    useEffect(() => {
        const getProblems = async () => {
            const data = await fetchProblems();
            if (Array.isArray(data)) {
                const cleanedData = data.map((item: { status: string; title: string; acceptance: any; difficulty: string; }) => ({
                    ...item,
                    title: cleanTitle(item.title),
                    acceptance: formatAcceptance(item.acceptance)
                }));
                setDatas(cleanedData);
            } else {
                console.error("Unexpected data format:", data);
            }
        };
        getProblems();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col container mx-auto mt-20 cursor-pointer">
                <DataTable
                    columns={columns as ColumnDef<{ status: string; title: string; acceptance: number; difficulty: string; }>[]}
                    data={datas}
                />
            </div>
        </>
    );
};

export default Page;