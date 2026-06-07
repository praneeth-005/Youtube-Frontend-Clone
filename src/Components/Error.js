import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
            <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
            <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-lg text-gray-600 mb-6">
                {error.statusText || error.message || "An unexpected error occurred."}
            </p>
            <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium">
                Go back to Home
            </Link>
        </div>
    );
}

export default Error;
