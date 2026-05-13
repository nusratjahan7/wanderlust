"use client";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Card, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";


const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
            callbackURL: "/"

        })

        if (data) {
            toast.success("Successfully logged in");
            router.push("/");
        }

        if (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
            return;
        }

    };
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        })
    }
    return (
        <div className="flex items-center justify-center my-10">
            <div>
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-medium font-serif">Welcome Back</h1>
                    <p className="text-(--text2)">Resume your adventure with Wanderlust</p>
                </div>

                <Card className="shadow-sm border border-gray-200/30 rounded-none">
                    <Form
                        className="flex w-96 flex-col gap-4"
                        render={(props) => <form {...props} data-custom="foo" />}
                        onSubmit={onSubmit}
                    >


                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="font-semibold">Email</Label>
                            <Input placeholder="Enter your email" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label className="font-semibold">Password</Label>
                            <InputGroup>
                                <InputGroup.Input
                                    className="w-full"
                                    placeholder="Enter your password"
                                    type={isVisible ? "text" : "password"}
                                />
                                <InputGroup.Suffix className="pr-0">
                                    <Button
                                        isIconOnly
                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                        size="sm"
                                        variant="ghost"
                                        onPress={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>

                            <FieldError />
                        </TextField>

                        <div className="flex justify-center">
                            <Button type="submit" className="w-full rounded-none bg-(--brand) hover:bg-(--brand)/90">
                                Log In
                            </Button>

                        </div>
                    </Form>
                    <div className="divider text-(--text2) h-0.5">Or sign up with</div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <button onClick={handleGoogleSignIn} className="btn w-full bg-white text-black border-[#e5e5e5]">
                            <FcGoogle className="h-4 w-4" />
                            Sign up with Google
                        </button>
                        <div className="flex gap-1">
                            <p className="text-sm text-(--text2)">Don't have an account?</p>
                            <Link href={'/signup'} className="text-(--brand) font-bold">Sign up</Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div >
    );
};

export default LoginPage;