import Layout from "@/Layouts/Layout";
import React from "react";
import { Link } from "@inertiajs/react";

export default function Index() {
    return (
        <Layout>
            <h1 className="flex justify-center text-3xl font-bold px-4 py-2">
                Financial Dashboard
            </h1>
            <div className="flex flex-col space-y-2 text-lg mt-4 w-fit">
                <Link
                    className="hover:text-blue-400 transition-colors duration-300"
                    href="/insurances"
                >
                    Biztositások
                </Link>
                <Link
                    className="hover:text-blue-400 transition-colors duration-300"
                    href="/invoices"
                >
                    Számlák
                </Link>
                <Link
                    className="hover:text-blue-400 transition-colors duration-300"
                    href="/shoppinglist"
                >
                    Bevásárló Lista
                </Link>
                <Link
                    className="hover:text-blue-400 transition-colors duration-300"
                    href="/transaction"
                >
                    Tranzakciók
                </Link>
                <Link
                    className="hover:text-blue-400 transition-colors duration-300"
                    href="/subscription"
                >
                    Előfizetések
                </Link>
            </div>
        </Layout>
    );
}
