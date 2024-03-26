import React from "react";

export default function useCancelUpdate() {
    const cancel = (id, array, setArray) => {
        const updated = array.map((f) => {
            if (f.id === id) {
                return {
                    ...f,
                    isEdit: false,
                };
            }
            return f;
        });
        setArray(updated);
    };
    return cancel;
}
