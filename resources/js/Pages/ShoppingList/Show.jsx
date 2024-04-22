import Button from "@/Components/Button";
import Title from "@/Components/Title";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function Show({ list, items }) {
    return (
        <Layout>
            <div className="text-lg">
                <Title className="text-2xl font-bold text-center">
                    {list.name}
                </Title>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-64 h-1 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-800">
                        <svg
                            className="w-4 h-4 text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 14"
                        >
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                    </div>
                </div>
                <div className="mt-2 leading-6 grid grid-cols-2 w-2/3 mx-auto space-y-1">
                    <div className="col-span-2 flex border-b border-black mb-2 py-2">
                        <p className="w-full text-2xl font-bold">Bevásárlás</p>
                        <p className="w-full text-right text-2xl font-bold">
                            Ár
                        </p>
                    </div>
                    {items.map((i) => {
                        return (
                            <div className="flex justify-between col-span-2 border-b leading-7 border-gray-500">
                                <p>{i.name}</p>
                                <p>€{i.price}</p>
                            </div>
                        );
                    })}
                </div>
                <Button
                    onClick={() =>
                        (window.location.href = `/shoppinglist/${list.id}/edit`)
                    }
                    className="mt-5 mx-auto flex"
                >
                    Szerkesztés
                </Button>
            </div>
        </Layout>
    );
}
