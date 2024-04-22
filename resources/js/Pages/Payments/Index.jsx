import Layout from "@/Layouts/Layout";
import React, { useEffect, useState, useRef } from "react";
import Title from "@/Components/Title";
import Button from "@/Components/Button";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import useAdd from "@/Hooks/useAdd";
import useCancelUpdate from "@/Hooks/useCancelUpdate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "@/Components/Input";
import Form from "@/Components/Form";
export default function Index({ payments }) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [payment, setPayment] = useState(payments);
    const [isEdit, setIsEdit] = useState(false);
    const [edited, setEdited] = useState(false);
    useEffect(() => {
        setPayment(payments);
    }, [payments]);

    const total = payment.reduce((a, b) => a + b.price, 0);

    const add = useAdd({
        array: payment,
        setArray: setPayment,
        setIsVisibleAdd: setIsVisibleAdd,
        setIsEdit: setIsEdit,
        setEdited: setEdited,
    });

    const cancel = useCancelUpdate();

    function markAsEdit(id) {
        window.location.href = `/payments/${id}/edit`;
    }

    function deleteRow(id) {
        Swal.fire({
            title: "Biztos, hogy törli a kiválasztott fizetéseket?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Mégsem",
            confirmButtonText: "Igen, törlöm",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(`/payments/${id}`);
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Hiba",
                    icon: "error",
                    confirmButtonText: "Ok",
                    text: error,
                });
            });
    }

    function sendData(e) {
        e.preventDefault();
        const dataToSend = payment.map((f) => {
            return {
                name: f.name,
                price: f.price,
            };
        });
        console.log(dataToSend);
        router.post("/payment", dataToSend);
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
                text: errors,
            })
        );
        setEdited(false);
    }

    return (
        <Layout>
            <Title>Fizetések</Title>
            {payment.length !== 0 ? (
                <div>
                    <div
                        className="grid grid-cols-4 py-2 text-gray-700"
                        style={{ gridTemplateColumns: "1fr 1fr auto auto" }}
                    >
                        <p className="font-bold uppercase text-lg">Fizetés</p>
                        <p className="font-bold uppercase text-lg px-2">Ár</p>
                        <p className="px-4"></p>
                        <p className="px-4"></p>
                    </div>
                    {payment.map((f) => (
                        <div key={f.id}>
                            <div
                                className="grid grid-cols-4 py-2 text-gray-700"
                                onDoubleClick={() => markAsEdit(f.id)}
                                key={f.id}
                                style={{
                                    gridTemplateColumns: "1fr 1fr auto auto",
                                }}
                            >
                                <p
                                    className="cursor-pointer hover:font-bold transition-all duration-300"
                                    onClick={() => {
                                        window.location.href = `/payments/${f.id}`;
                                    }}
                                >
                                    {f.name}
                                </p>
                                <p>${f.price}</p>
                                <div className="flex justify-end w-full">
                                    <EditIcon
                                        onClick={() => markAsEdit(f.id)}
                                        className="text-gray-400 hover:text-gray-800 cursor-pointer transition-all duration-300"
                                    />
                                </div>
                                <div className="flex justify-end w-full">
                                    <DeleteIcon
                                        onClick={() => deleteRow(f.id)}
                                        className="text-gray-300 hover:text-red-800 cursor-pointer transition-all duration-300"
                                    />
                                </div>
                            </div>
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
                    Nincsenek fizetések, adj hozzá valamit!
                </p>
            )}

            {isVisibleAdd && (
                <Form className="flex gap-2">
                    <Input
                        type="text"
                        onKeyDown={add}
                        autoFocus
                        placeholder="Előfizetés"
                    />
                    <Input type="number" placeholder="Ár" onKeyDown={add} />
                </Form>
            )}
            <div className="flex justify-between mt-5">
                {edited ? (
                    <form onSubmit={sendData}>
                        {payment.map((f) => (
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
                    <Button onClick={() => setIsVisibleAdd(true)}>
                        Hozzáad
                    </Button>
                )}
            </div>
        </Layout>
    );
}
