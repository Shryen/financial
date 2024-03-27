import React from "react";

export default function Form({ children, method, className }) {
    const formClass = `flex gap-2 mt-2 ${className}`;
    return (
        <form method={method} className={formClass}>
            {children}
        </form>
    );
}
