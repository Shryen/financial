import React from "react";
import { Link } from "@inertiajs/react";

export default function NavLink({ children, link }) {
    return (
        <Link
            className="hover:text-blue-400 transition-colors duration-300"
            href={link}
        >
            {children}
        </Link>
    );
}
