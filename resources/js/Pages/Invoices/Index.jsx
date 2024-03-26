import Layout from "@/Layouts/Layout";
import React, { useState } from "react";
import Title from "@/Components/Title";
import Button from "@/Components/Button";
import useAdd from "@/Hooks/useAdd";

export default function Index(invoices) {
    const [invoice, setInvoice] = useState([
        {
            id: 1,
            name: "Számla",
            price: 0,
            isEdit: false,
        },
        {
            id: 2,
            name: "Számla",
            price: 0,
            isEdit: false,
        },
    ]);
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const addItem = useAdd({
        array: invoice,
        setArray: setInvoice,
        setIsVisibleAdd: setIsVisibleAdd,
        setIsEdit: setIsEdit,
    });

    return (
        <Layout>
            <Title>Számlák</Title>
            {invoice.map((item) => (
                <div key={item.id} className="flex justify-between">
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                </div>
            ))}
            {isVisibleAdd && (
                <form>
                    <input type="text" onKeyDown={addItem} autoFocus />
                    <input type="number" />
                </form>
            )}
            <Button onClick={() => setIsVisibleAdd(true)}>Hozzáad</Button>
        </Layout>
    );
}
