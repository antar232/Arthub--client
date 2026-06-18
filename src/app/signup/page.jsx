"use client";

import React, { useState } from "react";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("buyer"); // Role State

  const validationChecks = {
    length: passwordValue.length >= 6,
    lowercase: /[a-z]/.test(passwordValue),
    uppercase: /[A-Z]/.test(passwordValue),
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Password validation logic
    if (user.password !== user.confirmPassword) {
      setServerError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        role: role, 
      });

      if (data) router.push("/login");
      if (error) setServerError(error.message || "Registration failed.");
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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000')] bg-cover bg-center opacity-80"></div>
          <div className="relative z-10 space-y-4">
             <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6 text-2xl">🎨</div>
             <h2 className="text-4xl font-bold">Join ArtHub</h2>
             <p className="text-gray-200 text-lg">Buy and sell original art, globally.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500 mb-8">Already have an account? <Link href="/login" className="text-orange-600 font-semibold hover:underline">Sign in</Link></p>

          <Button variant="bordered" className="w-full mb-6 py-6 font-medium text-gray-700 flex gap-2 rounded-2xl hover:bg-green-400" onClick={() => authClient.signIn.social({ provider: "google" })}>
            <FcGoogle size={20} /> Continue with Google
          </Button>

          <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
            <TextField
                isRequired
                name="name"
                type="text"
                className="flex flex-col gap-1.5"
              >
                <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">
                  Full name
                </Label>
                <Input
                  placeholder="Rahim Sarkar"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
                />
              </TextField>
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
                <Input
                  placeholder="rahim@mail.com"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
                />
              </TextField>
             <TextField
              name="image"
              type="url"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">
                Photo URL
              </Label>
              <Input
                placeholder="https://i.ibb.co/your-photo.jpg"
                className="w-full px-3 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
              />
              <span className="text-[11px] text-slate-400 dark:text-emerald-500/70">
                Upload to imgbb or postimage and paste the link
              </span>
            </TextField>

            <TextField
              isRequired
              name="password"
              className="flex flex-col gap-1.5"
            >
              <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="••••••"
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


            {/* Role Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">I am joining as a...</Label>
              <div className="flex gap-4">
                <label className={`p-4 border rounded-xl cursor-pointer flex-1 transition-all ${role === 'buyer' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                  <input type="radio" name="role" value="buyer" checked={role === 'buyer'} onChange={() => setRole('buyer')} className="hidden" />
                  <span className="font-bold block">Buyer</span>
                  <p className="text-xs text-gray-500">Discover & collect art</p>
                </label>
                <label className={`p-4 border rounded-xl cursor-pointer flex-1 transition-all ${role === 'artist' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                  <input type="radio" name="role" value="artist" checked={role === 'artist'} onChange={() => setRole('artist')} className="hidden" />
                  <span className="font-bold block">Artist</span>
                  <p className="text-xs text-gray-500">Sell your creations</p>
                </label>
              </div>
            </div>

            {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

            <Button type="submit" isLoading={isLoading} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 mt-2">
              Create Account
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;