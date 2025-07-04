// app/page.tsx
import Link from "next/link";
import Head from 'next/head';

export default function Signin() {
  return (
      <div className="min-h-screen bg-darkblue flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl mx-auto text-center px-4 space-y-10">
          {/* Logo/Title */}
          <h1 className="font-[Open_Sans] md:text-7xl font-bold text-white">SMARTSPEND</h1>
          {/* Tagline */}
          <p className="text-white">
            Effortless Budgeting, Endless Possibilities
          </p>
          
          {/* Buttons */}
          <div className="space-y-7">
            <Link
              href="/register"
              className="block w-full md:w-96 lg:w-80 mx-auto bg-amber-500 hover:bg-yellow-700 text-black hover:text-gray-200 font-medium py-2 px-4 rounded-xl text-center transition-colors duration-200"
            >
              REGISTER
            </Link>
            
            <Link
              href="/login"
              className="block w-full md:w-96 lg:w-80 mx-auto border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-medium py-2 px-4 rounded-xl text-center transition-colors duration-200"
            >
              LOGIN
            </Link>
          </div>
          
          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-white">Or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          
          {/* Social Auth Icons */}
          <div className="flex justify-center space-x-4">
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
  );
}