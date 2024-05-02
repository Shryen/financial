import React from "react";

const DangerButton = ({ onClick, children }) => {
    return (
        <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default DangerButton;
