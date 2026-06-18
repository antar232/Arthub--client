"use client";

import React, { useState } from "react";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) router.push("/");
      if (error) setServerError(error.message || "Invalid credentials.");
    } catch (err) {
      setServerError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Left Side - Artwork Image */}
        <div className="hidden md:flex md:w-5/12 bg-black p-12 flex-col justify-center text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000')] bg-cover bg-center opacity-80"></div>
          <div className="relative z-10 space-y-4">
             <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6 text-2xl">🎨</div>
             <h2 className="text-4xl font-bold">Welcome Back</h2>
             <p className="text-gray-200 text-lg">Continue your art journey.</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in to ArtHub</h1>
          <p className="text-gray-500 mb-8">Don't have an account? <Link href="/signup" className="text-orange-600 font-semibold hover:underline">Create one</Link></p>

          <Button variant="bordered" className="w-full mb-6 py-6 font-medium text-gray-700 flex gap-2 hover:bg-green-600" onClick={() => authClient.signIn.social({ provider: "google" })}>
            <FcGoogle size={20} /> Continue with Google
          </Button>

          <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1.5"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">
                Email address
              </Label>
              <div className="relative">
                <Input
                  placeholder="name@mail.com"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
                />
              </div>
            </TextField>

            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              className="flex flex-col gap-1.5"
            >
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  placeholder="••••••••"
                  className="w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-500 hover:text-slate-600 dark:hover:text-emerald-300 focus:outline-none"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <IoEyeOutline size={18} />
                  )}
                </button>
              </div>
            </TextField>

            {serverError && (
              <div className="flex items-center gap-2 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-3 py-2 rounded-lg border border-rose-200 dark:border-rose-900">
                <span>⚠️</span> {serverError}
              </div>
            )}

            <Button
              className="w-full mt-2 bg-orange-600 hover:bg-orange-800 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm text-sm focus:outline-none flex justify-center items-center"
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Log in
            </Button>
          </Form>


          <p className="text-center text-xs text-gray-400 mt-8">
            Admin demo: admin@arthub.com / Admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;