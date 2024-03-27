import Button from "@/Components/Button";
import Title from "@/Components/Title";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function Show({ insurances }) {
    return (
        <Layout>
            <div className="text-lg">
                <Title className="text-2xl font-bold text-center">
                    {insurances.name}
                </Title>
                <div class="inline-flex items-center justify-center w-full">
                    <hr class="w-64 h-1 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                    <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-800">
                        <svg
                            class="w-4 h-4 text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 14"
                        >
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                    </div>
                </div>
                <div className="mt-2 leading-6 grid grid-cols-2 place-content-evenly w-2/3 mx-auto">
                    <p className="w-full">Biztositás neve: </p>
                    <p className=" text-right">{insurances.name}</p>
                    <p className="w-full">Biztositás ára: </p>
                    <p className="w-full text-right">{insurances.price}</p>
                </div>
                <Button
                    onClick={() =>
                        (window.location.href = `/insurances/${insurances.id}/edit`)
                    }
                    className="mt-5 mx-auto flex"
                >
                    Szerkesztés
                </Button>
            </div>
        </Layout>
    );
}
