import React, { useState } from "react";

export default function useUpdate(initialValues) {
    const [value, setValue] = useState(initialValues);

    const handleChange = (e) => {
        const key = e.target.id;
        const values = e.target.value;
        setValue({
            ...value,
            [key]: values,
        });
    };

    const update = (e, router, url, id) => {
        e.preventDefault();
        const text = value?.name;
        const price = value?.price;
        if (text && price) {
            router.put(`/${url}/${id}`, {
                name: text,
                price: price,
            });
        }
    };

    return {
        value,
        handleChange,
        update,
    };
}
