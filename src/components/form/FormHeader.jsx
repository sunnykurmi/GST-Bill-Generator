"use client";
import useInvoiceStore from "@/app/store/invoiceStore";
import {
  RiEyeLine,
  RiPrinterLine,
  RiRefreshLine,
} from "@remixicon/react";
import React from "react";

const FormHeader = () => {
  const reset = useInvoiceStore((s) => s.reset);

  const handleReset = () => {
    const confirmed = window.confirm(
      "This will clear the entire invoice.\nAre you sure you want to reset?"
    );

    if (confirmed) {
      reset();
    }
  };

  const handlePrint = () => {
    window.open("/preview?print=true", "_blank");
  };

  return (
    <div className="w-full bg-[#0F2757] text-[#FCF1CF] md:flex justify-between p-5">
      <h1 className="text-3xl">GST Invoice Generator</h1>

      <div className="flex gap-5 justify-between items-center">
        <a href="/preview">
          <button className="flex items-center cursor-pointer uppercase gap-2 px-4 py-2 rounded-sm border border-[#FCF1CF] hover:bg-[#FCF1CF] hover:text-[#0F2757] hover:font-semibold transition-all">
            <RiEyeLine size={13} /> Preview
          </button>
        </a>

        <button onClick={handlePrint} className="flex items-center cursor-pointer uppercase gap-2 px-4 py-2 rounded-sm border border-[#FCF1CF] hover:bg-[#FCF1CF] hover:text-[#0F2757] hover:font-semibold transition-all">
          <RiPrinterLine size={13} /> Print
        </button>

        <button
          onClick={handleReset}
          className="cursor-pointer hover:scale-[1.2] transition-all"
          title="Reset Invoice"
        >
          <RiRefreshLine />
        </button>
      </div>
    </div>
  );
};

export default FormHeader;