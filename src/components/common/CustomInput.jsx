"use client";
import React, { useRef } from "react";

const CustomInput = ({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
}) => {
    const inputRef = useRef(null);

    const handleClick = () => {
        if (type === "date" && inputRef.current?.showPicker) {
            inputRef.current.showPicker();
        }
    };

    return (
        <div className="w-full">
            <label className="block mb-1 text-sm font-semibold tracking-wide text-slate-500">
                {label}
            </label>

            <input
                ref={inputRef}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onClick={handleClick}
                className="w-full text-base rounded-lg border border-slate-200 bg-slate-50 px-4 py-3    text-slate-800 placeholder-slate-400   focus:outline-none focus:ring-2 focus:ring-[#0f275751]   focus:border-[#0F2757] transition cursor-pointer"
            />
        </div>
    );
};

export default CustomInput;