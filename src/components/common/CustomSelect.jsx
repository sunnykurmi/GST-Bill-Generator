"use client";

import { RiArrowDownSLine } from "@remixicon/react";
import { useState, useRef, useEffect } from "react";

const CustomSelect = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="w-full relative">
      <label className="block mb-1 text-sm font-semibold tracking-wide text-slate-500">
        {label}
      </label>

      {/* Selected box */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-full flex text-base items-center justify-between
          rounded-lg border px-4 py-3
          bg-white text-left
          transition
          ${open
            ? "border-blue-700 ring-2 ring-blue-700/20"
            : "border-slate-300"}
        `}
      >
        <span className="text-slate-800">
          {selected?.label}
        </span>
        <RiArrowDownSLine
          size={18}
          className={`text-slate-500 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className=" max-h-52 overflow-y-scroll absolute z-50 mt-2 w-full rounded-md border border-slate-300 bg-white shadow-lg overflow-hidden">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`
                px-4 py-2.5 cursor-pointer text-sm
                ${
                  option.value === value
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100 text-slate-800"
                }
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;