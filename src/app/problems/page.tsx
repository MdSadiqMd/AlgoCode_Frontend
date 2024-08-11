'use client';

import type { NextPage } from "next";
import { ColumnDef } from "@tanstack/react-table";

import columns from "./columns";
import DataTable from "./data-table";
import Navbar from "@/components/ui/navbar";

const Page: NextPage = () => {
    const datas = [
        {
            status: "Not Attempted",
            title: "Problem 1",
            acceptance: 67.5,
            difficulty: "easy",
        },
        {
            status: "Attempted",
            title: "Problem 2",
            acceptance: 55.3,
            difficulty: "medium",
        },
        {
            status: "Completed",
            title: "Problem 3",
            acceptance: 82.1,
            difficulty: "hard",
        },
        {
            status: "Not Attempted",
            title: "Problem 1",
            acceptance: 67.5,
            difficulty: "easy",
        },
        {
            status: "Attempted",
            title: "Problem 2",
            acceptance: 55.3,
            difficulty: "medium",
        },
        {
            status: "Completed",
            title: "Problem 3",
            acceptance: 82.1,
            difficulty: "hard",
        },
        {
            status: "Not Attempted",
            title: "Problem 1",
            acceptance: 67.5,
            difficulty: "easy",
        },
        {
            status: "Attempted",
            title: "Problem 2",
            acceptance: 55.3,
            difficulty: "medium",
        },
        {
            status: "Completed",
            title: "Problem 3",
            acceptance: 82.1,
            difficulty: "hard",
        },
        {
            status: "Not Attempted",
            title: "Problem 1",
            acceptance: 67.5,
            difficulty: "easy",
        },
        {
            status: "Attempted",
            title: "Problem 2",
            acceptance: 55.3,
            difficulty: "medium",
        },
        {
            status: "Completed",
            title: "Problem 3",
            acceptance: 82.1,
            difficulty: "hard",
        },
        {
            status: "Not Attempted",
            title: "Problem 1",
            acceptance: 67.5,
            difficulty: "easy",
        },
        {
            status: "Attempted",
            title: "Problem 2",
            acceptance: 55.3,
            difficulty: "medium",
        },
        {
            status: "Completed",
            title: "Problem 3",
            acceptance: 82.1,
            difficulty: "hard",
        }
    ];

    return (
        <>
            <Navbar />
            <div className="flex flex-col container mx-auto mt-20">
                <DataTable
                    columns={columns as ColumnDef<{ status: string; title: string; acceptance: number; difficulty: string; }>[]}
                    data={datas}
                />
            </div>
        </>
    );
};

export default Page;