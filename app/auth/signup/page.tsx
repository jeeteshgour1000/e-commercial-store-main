"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { createHash } from "crypto";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null);
  const password1 = useRef<HTMLInputElement>(null);
  const password2 = useRef<HTMLInputElement>(null);


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !password1.current?.value ||
      !password2.current?.value ||
      !email.current?.value
    ) {
      toast.error("You should fill all the blank spaces");
      return;
    }

    if (password1.current?.value !== password2.current?.value) {
      toast.error("The password doesn't match");
      return;
    }

    const passwordHash1 = createHash("sha256")
      .update(password1.current?.value)
      .digest("hex");

    const data = {
      password: passwordHash1,
      email: email.current.value,
      type: "client",
    };
    try {
      axios.post("/api/addClient", data);
      toast.success("The account created successfully");
      router.push('/auth/login')
    } catch {
      toast.success("An error happened while creating the account");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignUp} // Attach the onSubmit handler to the form
        className="bg-white p-8 rounded-[30px] flex items-center justify-center flex-col shadow-lg lg:w-[500px] h-[550px] sm:w-[300px]"
      >
        <h1 className="lg:text-[30px] font-bold m-3 sm:text-[15px]">
          Create An Account
        </h1>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            ref={email}
            className="border lg:w-[450px] sm:w-[270px] border-gray-300 rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            ref={password1}
            className="lg:w-[450px] sm:w-[270px] flex border border-gray-300 rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter the password again"
            ref={password2}
            className="lg:w-[450px] sm:w-[270px] flex border border-gray-300 rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <button
          type="submit"
          className="lg:w-full bg-blue sm:w-[270px] text-white font-semibold px-4 py-2 rounded-md h-[50px]"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
