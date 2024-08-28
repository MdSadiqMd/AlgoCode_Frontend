"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, isLoading] = useState(false);

    const onSignup = async () => {
        try {
            isLoading(true);
            const response = await axios.post("/api/auth/signup", user);
            toast.success("Signup Successfull !!");
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            toast.error("SignUp Failed, Please Try Again");
            console.log("Signup failed", error.message);
        } finally {
            isLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            isLoading(false);
        } else {
            isLoading(true);
        }
    }, [user]);

    return (
        <>
            <Card className="mx-auto max-w-md mt-[4%]">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 space-y-2">
                        <div className="grid gap-2">
                            <Label htmlFor="text">Username</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Username"
                                value={user.username}
                                onChange={(e) =>
                                    setUser({ ...user, username: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={user.email}
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) =>
                                    setUser({ ...user, password: e.target.value })
                                }
                            />
                        </div>
                        <Button
                            className="w-full"
                            onClick={() => onSignup()}
                            disabled={loading}
                        >
                            Create account
                        </Button>
                    </div>
                    <div className="mt-1 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Log in
                        </Link>
                    </div>
                </CardContent>
                <CardFooter>
                    <div>
                        <p className="px-8 py-0.25 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}