"use client";
import React from "react";
import CustomInput from "../common/CustomInput";
import useInvoiceStore from "@/app/store/invoiceStore";

const BuyerDetails = () => {
  const buyer = useInvoiceStore((s) => s.buyer);
  const updateBuyer = useInvoiceStore((s) => s.updateBuyer);

  return (
    <div className="w-full p-5 md:p-10 pt-0 md:pt-0">
      <div className="w-full overflow-hidden rounded-xl">
        <div className="w-full bg-[#0F2757] text-[#FCF1CF] px-5 py-2">
          <h2 className="uppercase text-lg font-semibold">
            Buyer Details
          </h2>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-6 p-5 border border-black/20 border-t-0 bg-white rounded-b-xl">
          <div className="col-span-2">
            <CustomInput
              label="COMPANY NAME"
              value={buyer.companyName}
              onChange={(e) =>
                updateBuyer("companyName", e.target.value)
              }
            />
          </div>

          <CustomInput
            label="GST NUMBER"
            value={buyer.gst}
            onChange={(e) =>
              updateBuyer("gst", e.target.value)
            }
          />

          <div className="col-span-3">
            <CustomInput
              label="ADDRESS"
              value={buyer.address}
              onChange={(e) =>
                updateBuyer("address", e.target.value)
              }
            />
          </div>

          <CustomInput
            label="CITY"
            value={buyer.city}
            onChange={(e) =>
              updateBuyer("city", e.target.value)
            }
          />

          <CustomInput
            label="STATE"
            value={buyer.state}
            onChange={(e) =>
              updateBuyer("state", e.target.value)
            }
          />

          <CustomInput
            label="PINCODE"
            value={buyer.pincode}
            onChange={(e) =>
              updateBuyer("pincode", e.target.value)
            }
          />

          <div className="col-span-2">
            <CustomInput
              label="CONTACT NUMBER"
              value={buyer.phone}
              onChange={(e) =>
                updateBuyer("phone", e.target.value)
              }
            />
          </div>

          <CustomInput
            label="EMAIL (OPTIONAL)"
            value={buyer.email}
            onChange={(e) =>
              updateBuyer("email", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BuyerDetails;