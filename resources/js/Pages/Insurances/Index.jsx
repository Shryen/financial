import Layout from "@/Layouts/Layout";
import React, { useEffect, useState, useRef } from "react";
import Title from "@/Components/Title";
import Button from "@/Components/Button";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import useAdd from "@/Hooks/useAdd";
import useCancelUpdate from "@/Hooks/useCancelUpdate";

export default function Index({ insurances }) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [insurance, setInsurance] = useState(insurances);
    const [isEdit, setIsEdit] = useState(false);
    const [edited, setEdited] = useState(false);
    const [values, setValues] = useState({
        name: "",
        price: 0,
    });

    const form = useRef(null);

    useEffect(() => {
        setInsurance(insurances);
    }, [insurances]);

    const total = insurance.reduce((acc, item) => acc + item.price, 0);

    const add = useAdd({
        array: insurance,
        setArray: setInsurance,
        setIsVisibleAdd: setIsVisibleAdd,
        setIsEdit: setIsEdit,
    });

    const cancel = useCancelUpdate();

    function markAsEdit(id) {
        const updated = insurance.map((f) => {
            if (f.id === id) {
                f.isEdit = true;
            }
            return f;
        });
        setInsurance(updated);
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues({
            ...values,
            [key]: value,
        });
    }

    function update(e, id) {
        e.preventDefault();
        const text = values.name;
        const price = values.price;
        const updated = insurance.map((f) => {
            if (f.id === id) {
                if (e.target.value.trim().length === 0) {
                    f.isEdit = false;
                    return f;
                }
                f.name = values.name;
                f.price = values.price;
                console.log(f.price);
                f.isEdit = false;
            }
            setEdited(true);
            return f;
        });
        setInsurance(updated);
        console.log(text, price);
        router.put(`/insurances/${id}`, { name: text, price: price });
    }

    function sendData(e) {
        e.preventDefault();
        const dataToSend = insurance.map((f) => {
            return {
                name: f.name,
                price: f.price,
            };
        });
        console.log(dataToSend);
        router.post("/insurances", dataToSend);
        router.on("success", () =>
            Swal.fire({
                title: "Sikeres",
                icon: "success",
                confirmButtonText: "Ok",
            })
        );
        router.on("invalid", () =>
            Swal.fire({
                title: "Hiba",
                icon: "error",
                confirmButtonText: "Ok",
            })
        );
        router.on("error", (errors) =>
            Swal.fire({
                title: "Hiba",
                icon: "error",
                confirmButtonText: "Ok",
            })
        );
        // fetch("/insurances", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "X-CSRF-Token": csrfToken,
        //     },
        //     body: JSON.stringify(dataToSend),
        // })
        //     .then(() => console.log("Data sent succesfully", dataToSend))
        //     .catch((error) => console.log("Error: ", error));
    }

    return (
        <Layout>
            <Title>Biztositások</Title>
            {insurance.length !== 0 ? (
                <div>
                    {insurance.map((f) => (
                        <div key={f.id}>
                            {!f.isEdit ? (
                                <div
                                    className="flex justify-between"
                                    onDoubleClick={() => markAsEdit(f.id)}
                                    key={f.id}
                                >
                                    <p>{f.name}</p>
                                    <p>${f.price}</p>
                                </div>
                            ) : (
                                <form className="flex gap-2 mb-2">
                                    <input
                                        className="w-2/3 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-sm"
                                        type="text"
                                        name="name"
                                        id="name"
                                        defaultValue={f.name}
                                        onKeyDown={(event) => {
                                            if (event.key === "Escape") {
                                                cancel(
                                                    f.id,
                                                    insurance,
                                                    setInsurance
                                                );
                                            } else if (event.key === "Enter") {
                                                update(event, f.id);
                                            }
                                        }}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                    <input
                                        className="w-1/3 text-right focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-sm"
                                        type="text"
                                        name="price"
                                        id={`price`}
                                        onKeyDown={(event) => {
                                            if (event.key === "Escape") {
                                                cancel(
                                                    f.id,
                                                    insurance,
                                                    setInsurance
                                                );
                                            }
                                            if (event.key === "Enter") {
                                                update(event, f.id);
                                            }
                                        }}
                                        defaultValue={f.price}
                                        onChange={handleChange}
                                    />
                                </form>
                            )}
                        </div>
                    ))}
                    {total && (
                        <div className="flex justify-between font-bold mt-2">
                            <p>Összesen:</p>
                            <p>${total}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-red-500 font-bold">
                    Nincsenek biztositások, adj hozzá valamit!
                </p>
            )}

            {isVisibleAdd && (
                <form>
                    <input type="text" onKeyDown={add} autoFocus />
                    <input type="number" />
                </form>
            )}
            <div className="flex justify-between mt-5">
                <Button onClick={() => setIsVisibleAdd(true)}>Hozzáad</Button>
                {!edited ? (
                    <form onSubmit={sendData}>
                        {insurance.map((f) => (
                            <div key={f.id}>
                                <input
                                    type="hidden"
                                    name="name"
                                    value={f.name}
                                />
                                <input
                                    type="hidden"
                                    name="price"
                                    value={f.price}
                                />
                            </div>
                        ))}
                        <Button type="submit">Mentés</Button>
                    </form>
                ) : (
                    <form method="PUT">
                        {insurance.map((f) => (
                            <div key={f.id}>
                                <input type="hidden" id={f.id} value={f.id} />
                                <input
                                    type="hidden"
                                    name="name"
                                    value={f.name}
                                />
                                <input
                                    type="hidden"
                                    name="price"
                                    value={f.price}
                                />
                            </div>
                        ))}
                        <Button>Frissités</Button>
                    </form>
                )}
            </div>
        </Layout>
    );
}
