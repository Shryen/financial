import React from "react";
import { useState } from "react";

export default function useAdd({
    array,
    setArray,
    setIsVisibleAdd,
    setIsEdit,
}) {
    const add = (e) => {
        if (e.key === "Enter") {
            const text = e.target.value;
            const price = parseInt(e.target.nextSibling.value);
            const newItem = {
                id: array.length + 1,
                isEdit: false,
                name: text,
                price: price,
            };
            setArray((prevArray) => [...prevArray, newItem]); // Add newItem to the existing array
            setIsVisibleAdd(false);
        } else if (e.key === "Escape") {
            setIsVisibleAdd(false);
            setIsEdit(false);
        }
        console.log(array);
    };
    return add;
}
