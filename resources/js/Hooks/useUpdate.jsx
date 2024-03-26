import React, { useState } from "react";

export default function useUpdate(initialValues, setArray) {
    const [info, setInfo] = useState(initialValues);
    const [edit, setEdit] = useState(false);

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setInfo({
            ...info,
            [key]: value,
        });
        setEdit(true);
    };

    const handleSubmit = (id, arrayToUpdate, router, url) => {
        const text = info.name;
        const price = info.price;
        const updated = arrayToUpdate.map((f) => {
            if (f.id === id) {
                if (text.trim().length === 0) {
                    f.isEdit = false;
                    return f;
                }
                f.name = ;
                f.price = price;
                f.isEdit = false;
            }
            return f;
        });
        setArray(updated);
        router.put(`${url}/${id}`, { name: text, price: price });
    };

    return {
        info,
        setInfo,
        handleChange,
        handleSubmit,
    };
}
