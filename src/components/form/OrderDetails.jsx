"use client";
import React, { useEffect, useState } from "react";
import AddOrder from "./AddOrder";
import useInvoiceStore from "@/app/store/invoiceStore";
import { RiDeleteBin2Line, RiEditLine } from "@remixicon/react";

const OrderDetails = () => {
    const [openForm, setOpenForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const removeOrder = useInvoiceStore((s) => s.removeOrder);
    const orders = useInvoiceStore((s) => s.orders);

    useEffect(() => {
        if(window.innerWidth < 768) return
        if (openForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [openForm])

    console.log(orders);


    return (
        <>
            {openForm && (
                <AddOrder
                    setOpenForm={setOpenForm}
                    editIndex={editIndex}
                    setEditIndex={setEditIndex}
                />
            )}

            <div className="w-full p-5 md:p-10 pt-0 md:pt-0">
                <div className="w-full overflow-hidden rounded-xl border border-black">
                    <div className="w-full bg-[#0F2757] text-[#FCF1CF] px-5 py-2 flex justify-between">
                        <h2 className="uppercase text-lg font-semibold">
                            Order Details
                        </h2>
                        <button onClick={() => setOpenForm(true)} className="cursor-pointer">
                            + Add Order
                        </button>
                    </div>

                    {/* table header unchanged */}
                    {orders.length > 0 && (
                        <div className="grid uppercase text-xs grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-black text-center font-semibold">
                            <div className=" border-black p-1 text-start! pl-2">Description of Service</div>
                            <div className="border-l border-black p-1">HSN</div>
                            <div className="border-l border-black p-1">QTY</div>
                            <div className="border-l border-black p-1">Units</div>
                            <div className="border-l border-black p-1">Rate</div>
                            <div className=" border-l p-1 pr-2 text-right">Amount</div>
                            <div className=" border-l p-1 pr-2 ">Functionality</div>
                        </div>
                    )}
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_1fr] text-sm ${index !== orders.length - 1 ? "border-b border-black" : ""}`}            >
                            {/* Description */}
                            <div className="p-2">
                                <p className="font-bold uppercase">
                                    {order.serviceName}
                                </p>

                                <div className="mt-1 space-y-1">
                                    {order.serviceName === "Precast Boundary Wall" ? (
                                        order.descriptions.map((d, i) => (
                                            <p key={i}>
                                                {i + 1}. {d.label}
                                            </p>
                                        ))
                                    ) : (
                                        order.rate === 1 ? (
                                            <>
                                            </>
                                        ) : (
                                            order.descriptions.map((d, i) => (
                                                <p key={i}>
                                                    {i + 1}. {d.label}/{d.value}
                                                </p>
                                            ))
                                        )
                                    )}
                                </div>

                                <p className="mt-2 font-semibold">
                                    {order.serviceName === "Precast Boundary Wall" ? (
                                        order.unit === "sq.ft" ? (
                                            <>
                                                Total =   {order.totalValue} X {order.height} ft. (height) = {order.quantity.toFixed(2)} ({order.unit})

                                            </>
                                        ) : (
                                            <>
                                                Total =  <span></span>
                                                {order.quantity.toFixed(2)} ({order.unit})
                                            </>
                                        )

                                    ) : (
                                        order.rate === 1 ? (
                                            <>
                                            </>
                                        ) : (

                                            <>
                                                Total = {order.totalValue} / {order.divider} ={" "}
                                                {order.quantity.toFixed(2)} ({order.unit})
                                            </>
                                        )
                                    )}
                                </p>
                            </div>

                            <div className="p-2 text-center border-l">
                            {order.rate !== 1 && order.rate !== 0 && order.hsn}
                            </div>

                            <div className="p-2 text-center border-l">
                                {
                                    order.rate !== 1 && order.quantity.toFixed(2)
                                }
                            </div>

                            <div className="p-2 text-center border-l">
                                {order.unit}
                            </div>

                            <div className="p-2 text-center border-l">
                                {order.rate !== 1 && (
                                    <span>₹ {order.rate} / {order.unit}</span>
                                )}
                            </div>

                            <div className="p-2 text-right border-l ">
                                ₹ {order.amount.toFixed(2)}
                            </div>

                            <div className="p-2 flex flex-col  gap-y-2  border-l ">
                                <button
                                    onClick={() => {
                                        setEditIndex(index);
                                        setOpenForm(true);
                                    }}
                                    className=" w-full py-2 border cursor-pointer font-semibold  hover:bg-[#0F2757] uppercase hover:text-white text-[#0F2757] transition-all duration-300"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => removeOrder(index)}
                                    className=" w-full py-2  border cursor-pointer font-semibold  hover:bg-red-700  text-red-700 hover:text-white transition-all duration-300"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrderDetails;