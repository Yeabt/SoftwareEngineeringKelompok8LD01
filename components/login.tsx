'use client';
import Link from "next/link";
import Head from "next/head";
// import { useLogin } from "@/app/login/layout";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {

  const [form, setForm] = useState({email: '', password: '' });//
  const router = useRouter(); // ← Get the router instance

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      if (res.status === 200 && res.data.message === 'Login successful') {
        router.push('/dashboard');
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-darkblue flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md border-2 border-yellow-600 rounded-lg p-8 bg-black/35">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Log in with email</h1>
          <p className="text-white">
            Smarter spending starts here — AI-powered budget tracking for free
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value.trim() })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 caret-amber-500 bg-black/20 text-white placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <Link href="/forgot-password" className="text-sm text-yellow-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-blue-500 caret-amber-500 bg-black/20 text-white placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-black hover:bg-yellow-700 hover:text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Get Started
          </button>
        </form>

        <div className="mt-8">
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">or login with:</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span className="sr-only">Log in with Google</span>
              <span className="font-bold">G</span>
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span className="sr-only">Log in with Apple</span>
              <span className="font-bold">A</span>
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span className="sr-only">Log in with Microsoft</span>
              <span className="font-bold">M</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}