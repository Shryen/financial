import React from "react";

export default function Button({ children, onClick, type = "submit" }) {
    return (
        <button
            onClick={onClick}
            type={type}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 mt-2"
        >
            {children}
        </button>
    );
}
