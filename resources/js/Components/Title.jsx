import React from "react";

export default function Title({ children, className = "text-2xl font-bold" }) {
    return <div className={className}>{children}</div>;
}
