import React from "react";

export default function Input(props) {
    const {
        type,
        name,
        id,
        placeholder,
        defaultValue,
        onChange,
        onKeyDown,
        autoFocus,
    } = props;
    return (
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            defaultValue={defaultValue}
            onChange={onChange}
            autoFocus={autoFocus}
            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        />
    );
}
