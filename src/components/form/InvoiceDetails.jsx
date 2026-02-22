"use client";
import React from "react";
import CustomInput from "../common/CustomInput";
import useInvoiceStore from "@/app/store/invoiceStore";

const InvoiceDetails = () => {
  const invoice = useInvoiceStore((s) => s.invoice);
  const updateInvoice = useInvoiceStore((s) => s.updateInvoice);

  return (
    <div className="w-full p-5 md:p-10">
      <div className="w-full overflow-hidden rounded-xl">
        <div className="w-full bg-[#0F2757] text-[#FCF1CF] px-5 py-2">
          <h2 className="uppercase text-lg font-semibold">
            Invoice Details
          </h2>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 p-5 border border-black/20 border-t-0 bg-white rounded-b-xl">
          <CustomInput
            label="INVOICE NUMBER"
            value={invoice.number}
            onChange={(e) =>
              updateInvoice("number", e.target.value)
            }
          />

          <CustomInput
            label="INVOICE DATE"
            type="date"
            value={invoice.date}
            onChange={(e) =>
              updateInvoice("date", e.target.value)
            }
          />

          <CustomInput
            label="CGST %"
            value={invoice.cgst}
            onChange={(e) =>
              updateInvoice("cgst", e.target.value)
            }
          />

          <CustomInput
            label="SGST %"
            value={invoice.sgst}
            onChange={(e) =>
              updateInvoice("sgst", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;