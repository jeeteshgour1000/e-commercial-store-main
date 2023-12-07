'use client';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from submitting naturally

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    
    if (session) {
      redirect("/");
    }
    if (!result?.error) {
      toast.success('Logged successfully!');
      router.push('/'); // Redirect to the home page upon successful login
      
    } 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin} // Attach the onSubmit handler to the form
        className="bg-white p-8 rounded-[30px] flex items-center justify-center flex-col shadow-lg lg:w-[500px] h-[550px] sm:w-[300px]"
      >
        <h1 className="lg:text-[30px] font-bold m-3 sm:text-[15px]">
          Login To Your Account
        </h1>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border lg:w-[450px] sm:w-[270px] border-gray-300 rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="lg:w-[450px] sm:w-[270px] flex border border-gray-300 rounded-md px-3 py-2 h-[50px]"
          />
        </div>
        <button
          type="submit"
          className="lg:w-full bg-blue sm:w-[270px] text-white font-semibold px-4 py-2 rounded-md h-[50px]"
        >
          Login
        </button>
        <p className="p-5">Do not have an account?</p>
        <Link className="p-1 text-blue" href={"/auth/signup"}>
          SignUp
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
