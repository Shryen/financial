import React from "react";
import { Link } from "@inertiajs/react";

export default function DropdownItem({ children, link }) {
    return (
        <Link
            className=" hover:bg-gray-200 transition-colors duration-300 px-2 py-1"
            href={link}
        >
            {children}
        </Link>
    );
}
