import React from 'react';
import { Link } from 'react-router-dom'; // or use <a> if you're not using react-router

function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-gray-300 mb-4">404</h1>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          Oops! Page not found
        </h2>
        
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          The page you're looking for might have been moved, deleted, 
          or maybe it just got shy and hid from us.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-lg 
                       hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            Go back to Home
          </Link>
          
          <Link
            to="/terms"
            className="inline-block px-8 py-4 border border-gray-300 text-gray-700 font-medium 
                       rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            View Terms & Conditions
          </Link>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>Bahana AI • Still learning, still here for you</p>
        </div>
      </div>
    </main>
  );
}

export default NotFound;