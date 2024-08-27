import mongoose, { Model, Schema } from "mongoose";

import { UserInterface } from "@/types/user.types";

const userSchema = new Schema<UserInterface>({
    username: {
        type: String,
        required: [true, "Please Provide a Username"],
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    password: {
        type: String,
        select: false,
        validate: {
            validator: (value: any) => value.length > 6,
            message: "Password must be greater than 6 characters",
        },
    },
    authProviderId: { type: String },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

let User: Model<UserInterface>;

try {
    User = mongoose.model<UserInterface>("users");
} catch (error) {
    User = mongoose.model<UserInterface>("users", userSchema);
}

export default User;