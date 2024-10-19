import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveToken } from "@/redux/authentication/jwtTokenSlice";

// Zod schema definition with custom error messages for both fields
const formSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters." })
        .max(30, { message: "Username can't exceed 30 characters." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number.",
        }),
});

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

interface LoginFormProps {
    isLoggingIn: boolean;
}

export function LoginForm({ isLoggingIn }: LoginFormProps) {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<String | null>(null);

    const loginUser = (username: string, password: string) => {
        const loginData = { username, password };
        const url = "trader/";
        const endpoint = isLoggingIn ? "login" : "register";

        return fetch(url + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        })
            .then((response) => {
                if (response.status === 403 || !response.ok) {
                    const message = "Invalid username or password";
                    setErrorMessage(message);
                    throw new Error(message);
                }
                return response.json();
            })
            .then((data) => {
                setErrorMessage(null);
                localStorage.setItem("jwt", data.value);
                dispatch(saveToken(data.value));
                return data;
            })
            .catch((error) => console.error("Error:", error));
    };

    const redirectToLogin = () => navigate("/login");
    const redirectToRegister = () => navigate("/register");

    const form = useForm({
        resolver: zodResolver(isLoggingIn ? loginSchema : formSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (data: any) => {
        await loginUser(data.username, data.password);
        if (isLoggingIn && !errorMessage) {
            navigate("/");
        } else {
            redirectToLogin();
        }
    };

    return (
        <Card className="p-10 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl">
                    {isLoggingIn ? "Login" : "Create Account"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="loginForm flex items-center justify-center h-full">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {/* Username field */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your username"
                                                {...field}
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                className="min-w-96"
                                            />
                                        </FormControl>
                                        {!isLoggingIn && (
                                            <FormDescription>
                                                This is your public display
                                                name.
                                            </FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        {!isLoggingIn && (
                                            <FormDescription>
                                                Make sure your password is at
                                                least 6 characters long and
                                                contains a number.
                                            </FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Error message */}
                            {errorMessage && (
                                <div className="text-red-500">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting
                                        ? isLoggingIn
                                            ? "Logging in..."
                                            : "Creating account..."
                                        : isLoggingIn
                                        ? "Login"
                                        : "Create account"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Suggest Create Account */}
                {isLoggingIn && (
                    <div className="mt-4 text-center">
                        <p>Don't have an account?</p>
                        <Button
                            variant="link"
                            onClick={redirectToRegister}
                            className="text-blue-500 hover:underline"
                        >
                            Create an Account
                        </Button>
                    </div>
                )}

                {/* Suggest Login */}
                {!isLoggingIn && (
                    <div className="mt-4 text-center">
                        <p>Already have an account?</p>
                        <Button
                            variant="link"
                            onClick={redirectToLogin}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
