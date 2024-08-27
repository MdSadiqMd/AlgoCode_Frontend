import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectDB from "@/db/db.config";
import User from "@/models/user.model";
import { UserInterface } from "@/types/user.types";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //console.log("Request Body:", request.body);
    const reqBody: UserInterface = await request.json();
    const { email, password } = reqBody;
    //console.log("Parsed Request Body:", reqBody);

    // Check if the user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    //console.log("User exists:", user);

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
    //console.log('Token:', token);

    // Set the token in cookies
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}