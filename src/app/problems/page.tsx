'use client';

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
            console.log(error);
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

    useEffect(() => {
        const getProblems = async () => {
            const data = await fetchProblems();
            const cleanedData = data.map((item: { status: string; title: string; acceptance: number; difficulty: string; }) => ({
                ...item,
                title: cleanTitle(item.title)
            }));
            setDatas(cleanedData);
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