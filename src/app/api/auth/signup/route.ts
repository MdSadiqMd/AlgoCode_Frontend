import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import connectDB from "@/db/db.config";
import User from "@/models/user.model";
import { UserInterface } from "@/types/user.types";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody: UserInterface = await request.json();
        const { username, email, password } = reqBody;
        const user = await User.findOne({ email });
        if (user) {
            console.log("User found");
            return NextResponse.json(
                { message: "User already Found", success: true, user },
                { status: 200 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json(
            {
                message: "User Created Successfully",
                success: true,
                savedUser,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}