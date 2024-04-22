import Layout from "@/Layouts/Layout";
import React from "react";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index() {
    const [price, setPrice] = useState(0);
    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/calculate-total"
                );
                const data = await response.json();
                console.log(data);
                setPrice(data);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };
        fetchTotal();
    }, []);
    return (
        <Layout>
            <h1 className="flex justify-center text-3xl font-bold px-4 py-2">
                Financial Dashboard
            </h1>
            <div className="flex flex-col space-y-2 text-lg mt-4">
                <div className="flex justify-between w-full">
                    <Link
                        className="hover:text-blue-400 transition-colors duration-300"
                        href="/insurances"
                    >
                        Biztositások
                    </Link>
                    <p className="px-4 font-bold">€{price.insurance}</p>
                </div>
                <div className="flex justify-between w-full">
                    <Link
                        className="hover:text-blue-400 transition-colors duration-300"
                        href="/invoices"
                    >
                        Számlák
                    </Link>
                    <p className="px-4 font-bold">€{price.invoice}</p>
                </div>
                <div className="flex justify-between w-full">
                    <Link
                        className="hover:text-blue-400 transition-colors duration-300"
                        href="/shoppinglist"
                    >
                        Bevásárló Lista
                    </Link>
                    <p className="px-4 font-bold">€{price.shoppingList}</p>
                </div>
                <div className="flex justify-between w-full">
                    <Link
                        className="hover:text-blue-400 transition-colors duration-300"
                        href="/transaction"
                    >
                        Tranzakciók
                    </Link>
                    <p className="px-4 font-bold">€{price.transaction}</p>
                </div>
                <div className="flex justify-between w-full">
                    <Link
                        className="hover:text-blue-400 transition-colors duration-300"
                        href="/payment"
                    >
                        Fizetések
                    </Link>
                    <p className="px-4 font-bold">€{price.payment}</p>
                </div>
                <div className="flex justify-between w-full">
                    <Link
                        className="hover:text-blue-400 transition-colors duration-300"
                        href="/subscription"
                    >
                        Előfizetések
                    </Link>
                    <p className="px-4 font-bold">€{price.subscription}</p>
                </div>
            </div>
            {price.total && (
                <div className="flex w-full justify-between text-xl mt-2 pt-4 border-t border-black font-bold">
                    <p>Összesen</p>
                    <p>€{price.total}</p>
                </div>
            )}
        </Layout>
    );
}
