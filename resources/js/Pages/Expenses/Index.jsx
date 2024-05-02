import Layout from "@/Layouts/Layout";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Index() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const getExpenses = async () => {
            const response = await fetch("http://localhost:8000/getExpenses");
            const data = await response.json();
            console.log(data);
            setExpenses(data.expenses);
        };
        getExpenses();
    }, []);
    return (
        <Layout>
            <div className="w-full">
                <h1 className="text-center py-2 font-bold text-lg">Kiadások</h1>
                <div className="w-1/2 mx-auto text-center">
                    <div className="grid grid-cols-2">
                        <h1 className="text-lg font-semibold">Kiadás</h1>
                        <h1 className="text-lg font-semibold">Ár</h1>
                        {expenses.map((expense) => (
                            <React.Fragment key={expense.id}>
                                {expense.subscription && (
                                    <div>{expense.subscription.name}</div>
                                )}
                                {expense.subscription && (
                                    <div>{expense.subscription.price}</div>
                                )}
                                {expense.transaction && (
                                    <div>{expense.transaction.name}</div>
                                )}
                                {expense.transaction && (
                                    <div>{expense.transaction.price}</div>
                                )}
                                {expense.payment && (
                                    <div>{expense.payment.name}</div>
                                )}
                                {expense.payment && (
                                    <div>{expense.payment.price}</div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
