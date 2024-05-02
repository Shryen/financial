import React from "react";

const DangerButton = ({ onClick, children }) => {
    return (
        <button
            className="bg-white border border-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default DangerButton;
