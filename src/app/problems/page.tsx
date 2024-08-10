import type { NextPage } from "next";
import { ColumnDef } from "@tanstack/react-table";

import columns from "./columns";
import DataTable from "./data-table";

const Page: NextPage = () => {
    const data = [
        {
            "status": "Not Attempted",
            "title": 101,
            "acceptance": 67.5,
            "difficulty": "easy"
        },
        {
            "status": "Attempted",
            "title": 102,
            "acceptance": 55.3,
            "difficulty": "medium"
        },
        {
            "status": "Completed",
            "title": 103,
            "acceptance": 82.1,
            "difficulty": "hard"
        },
        {
            "status": "Not Attempted",
            "title": 104,
            "acceptance": 74.2,
            "difficulty": "medium"
        },
        {
            "status": "Attempted",
            "title": 105,
            "acceptance": 49.8,
            "difficulty": "easy"
        },
        {
            "status": "Not Attempted",
            "title": 101,
            "acceptance": 67.5,
            "difficulty": "easy"
        },
        {
            "status": "Attempted",
            "title": 102,
            "acceptance": 55.3,
            "difficulty": "medium"
        },
        {
            "status": "Completed",
            "title": 103,
            "acceptance": 82.1,
            "difficulty": "hard"
        },
        {
            "status": "Not Attempted",
            "title": 104,
            "acceptance": 74.2,
            "difficulty": "medium"
        },
        {
            "status": "Attempted",
            "title": 105,
            "acceptance": 49.8,
            "difficulty": "easy"
        },
        {
            "status": "Not Attempted",
            "title": 101,
            "acceptance": 67.5,
            "difficulty": "easy"
        },
        {
            "status": "Attempted",
            "title": 102,
            "acceptance": 55.3,
            "difficulty": "medium"
        },
        {
            "status": "Completed",
            "title": 103,
            "acceptance": 82.1,
            "difficulty": "hard"
        },
        {
            "status": "Not Attempted",
            "title": 104,
            "acceptance": 74.2,
            "difficulty": "medium"
        },
        {
            "status": "Attempted",
            "title": 105,
            "acceptance": 49.8,
            "difficulty": "easy"
        }
    ];

    return (
        <>
            <div className="container mx-auto py-10">
                <DataTable
                    columns={columns as ColumnDef<{ status: string; title: number; acceptance: number; difficulty: string; }>[]}
                    data={data}
                />
            </div>
        </>
    );
};

export default Page;