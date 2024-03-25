import Layout from "@/Layouts/Layout";
import React, { useEffect, useState } from "react";
import Title from "@/Components/Title";
import Button from "@/Components/Button";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({ insurances }) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [fake, setFake] = useState(insurances);
    const [isEdit, setIsEdit] = useState(false);
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        setFake(insurances);
    }, [insurances]);

    const total = fake.reduce((acc, item) => acc + item.price, 0);
    function add(e) {
        if (e.key === "Enter") {
            const text = e.target.value;
            const price = parseInt(e.target.nextSibling.value);
            const newItem = {
                id: fake.length + 1,
                isEdit: false,
                name: text,
                price: price,
            };
            setFake((prevFake) => [...prevFake, newItem]);
            setIsVisibleAdd(false);
        } else if (e.key === "Escape") {
            setIsVisibleAdd(false);
            setIsEdit(false);
        }
    }

    function cancelUpdate(id) {
        const updated = fake.map((f) => {
            if (f.id === id) {
                f.isEdit = false;
            }
            return f;
        });
        setFake(updated);
    }

    function markAsEdit(id) {
        const updated = fake.map((f) => {
            if (f.id === id) {
                f.isEdit = true;
            }
            return f;
        });
        setFake(updated);
    }

    function update(e, id) {
        const text = e.target.value;
        const updated = fake.map((f) => {
            if (f.id === id) {
                if (e.target.value.trim().length === 0) {
                    f.isEdit = false;
                    return f;
                }
                f.name = text;
                f.isEdit = false;
            }
            setEdited(true);
            return f;
        });
        setFake(updated);
        router.put(`/insurances/${id}`, { name: text });
    }

    function sendData(e) {
        e.preventDefault();
        const dataToSend = fake.map((f) => {
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
            {fake.length !== 0 ? (
                <div>
                    {fake.map((f) => (
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
                                <input
                                    type="text"
                                    name="name"
                                    onBlur={(event) => update(event, f.id)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            update(event, f.id);
                                        } else if (event.key === "Escape") {
                                            cancelUpdate(f.id);
                                        }
                                    }}
                                    defaultValue={f.name}
                                    autoFocus
                                />
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
                        {fake.map((f) => (
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
                    <form method="PUT" onSubmit={update}>
                        {fake.map((f) => (
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
                        <Button type="submit">Frissités</Button>
                    </form>
                )}
            </div>
        </Layout>
    );
}
