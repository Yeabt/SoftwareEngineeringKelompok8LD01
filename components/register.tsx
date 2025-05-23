// app/register/page.tsx
import Link from "next/link";
import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>Create Account | SmartSpend</title>
      </Head>

      <div className="min-h-screen bg-darkblue flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md border-2 border-yellow-600 rounded-lg p-8 bg-black/35">
          <h1 className="text-white text-2xl font-bold text-center mb-6">Create Account</h1>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">or use your email for registration:</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Registration Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 caret-amber-500 bg-darkblue text-white"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 caret-amber-500 bg-darkblue text-white"
                placeholder="Your email"
                required
              />
            </div>

            <div className="pb-5">
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 caret-amber-500 bg-darkblue text-white"
                placeholder="Your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-yellow-500 text-black hover:text-gray-200 font-medium py-2 px-4 rounded-xl text-center transition-colors duration-200"
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