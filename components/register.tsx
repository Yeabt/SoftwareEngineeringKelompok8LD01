// app/register/page.tsx
"use client";

import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Register() {
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const [form, setForm] = useState({username: '', email: '', password: '' });//


  const [cooldown, setCooldown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const isEmailValid = /^[^\s@]+@gmail\.com$/i.test(form.email);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerifyClick = () => {
    if (cooldown === 0 && isEmailValid) {
      setIsVerifying(true);

      setTimeout(() => {
        console.log("Verification code sent to:", form.email);
        setVerificationSent(true);
        setCooldown(60);
        setIsVerifying(false);
      }, 1500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      alert(res.data.message || 'User registered!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error registering user.');
    }
  };

  return (
    <>
      <Head>
        <title>Create Account | SmartSpend</title>
      </Head>

      <div className="min-h-screen bg-darkblue flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md border-2 border-yellow-600 rounded-lg p-8 bg-black/35">
          <h1 className="text-white text-2xl font-bold text-center mb-6">
            Create Account
          </h1>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">
              or use your email for registration:
            </span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 caret-amber-500 bg-darkblue text-white"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value.trim() })}
                  className={`w-full px-4 py-2 border ${
                    form.email && !isEmailValid
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-yellow-500 caret-amber-500 bg-darkblue text-white pr-28`}
                  placeholder="@gmail.com"
                  required
                  disabled={isVerifying}
                />
                <button
                  type="button"
                  onClick={handleVerifyClick}
                  disabled={cooldown > 0 || !isEmailValid || isVerifying}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm rounded-md transition-all
                    ${
                      cooldown > 0 || isVerifying
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-amber-600 hover:bg-amber-500 text-black"
                    }
                    ${!isEmailValid ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {isVerifying ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-1"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending
                    </span>
                  ) : cooldown > 0 ? (
                    `${cooldown}s`
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
              {form.email && !isEmailValid && (
                <p className="mt-1 text-xs text-red-400">
                  Please enter a valid email address
                </p>
              )}
              {verificationSent && isEmailValid && (
                <p className="mt-1 text-xs text-green-400">
                  Verification Code has been sent to your email
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 caret-amber-500 bg-darkblue text-white"
                placeholder="Your password"
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-yellow-500 text-black hover:text-gray-200 font-medium py-2 px-4 rounded-xl text-center transition-colors duration-200"
              disabled={isVerifying}
            >
              SIGN UP
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
