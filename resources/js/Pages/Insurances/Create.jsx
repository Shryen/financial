import Layout from "@/Layouts/Layout";
import React from "react";

export default function Create({ insurances }) {
    return (
        <Layout>
            {insurances.map((i) => (
                <div key={i.id}>
                    <p>{i.name}</p>
                    <p>{i.price}</p>
                </div>
            ))}
        </Layout>
    );
}
