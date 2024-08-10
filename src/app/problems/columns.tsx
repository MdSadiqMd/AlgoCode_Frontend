'use client';

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

type Problem = {
    status: 'Not Attempted' | 'Attempted' | 'Completed';
    title: string;
    acceptance: number;
    difficulty: 'easy' | 'medium' | 'hard';
};

const columns: ColumnDef<Problem>[] = [
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "acceptance",
        header: "Acceptance",
    },
    {
        accessorKey: "difficulty",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Difficulty
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
];

export default columns;