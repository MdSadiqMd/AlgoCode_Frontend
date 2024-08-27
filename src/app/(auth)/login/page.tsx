"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

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

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            toast.error("Please fill all fields");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post("/api/auth/login", user);
            console.log("Login successful!", response);
            router.push("/problems");
        } catch (error: any) {
            console.error("Login failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card className="mx-auto max-w-sm mt-[8%] items-center justify-center">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={onLogin}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                name="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
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
                                placeholder="Enter your password"
                                type="password"
                                name="password"
                                autoCapitalize="none"
                                autoComplete="current-password"
                                autoCorrect="off"
                                value={user.password}
                                onChange={(e) =>
                                    setUser({ ...user, password: e.target.value })
                                }
                            />
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading}
                        >
                            Sign in
                        </Button>
                        <div className="mt-1 text-center text-sm">
                            Not have an account?{" "}
                            <Link href="/signup" className="underline">
                                Create Account
                            </Link>
                        </div>
                    </CardContent>
                </form>
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
};

export default LoginPage;