import Input from "@/Components/Input";
import Title from "@/Components/Title";
import Layout from "@/Layouts/Layout";
import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import Button from "@/Components/Button";
import Form from "@/Components/Form";
import useUpdate from "@/Hooks/useUpdate";

export default function Edit({ invoices }) {
    const [values, setValues] = useState({
        name: invoices.name,
        price: invoices.price,
    });

    const { value, handleChange, update } = useUpdate({
        name: values.name,
        price: values.price,
    });

    return (
        <Layout>
            <Title>
                <span className="font-bold">Szerkesztés</span> <br />
                <span className="italic">
                    <Link
                        href={`/invoice/${invoices.id}`}
                        className="text-xl font-thin"
                    >
                        {invoices.name} #{invoices.id}
                    </Link>
                </span>
            </Title>
            <Form method="PUT" className="flex flex-col gap-2 mt-2">
                <label htmlFor="name">Biztositás: </label>
                <Input
                    id="name"
                    type="text"
                    defaultValue={values.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Ár</label>
                <Input
                    id="price"
                    type="text"
                    defaultValue={value.price}
                    onChange={handleChange}
                />
                <Button
                    className="w-1/3 mx-auto"
                    onClick={(e) => update(e, router, "invoices", invoices.id)}
                >
                    Frissités
                </Button>
            </Form>
        </Layout>
    );
}
