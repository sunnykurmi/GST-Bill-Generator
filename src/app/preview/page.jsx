"use client";
import React, { useEffect } from "react";
import useInvoiceStore from "../store/invoiceStore";
import { calculateGSTAmount, calculateTaxableAmount, formatCurrency, formatDate, roundOffAmount } from "@/utils/invoiceUtils";
import { numberToWordsIN } from "@/utils/numberToWords";
import { useSearchParams } from "next/navigation";
import { RiArrowLeftLine, RiPrinterLine } from "@remixicon/react";

const PreviewPage = () => {
    const searchParams = useSearchParams();
    const invoice = useInvoiceStore((s) => s.invoice);
    const buyer = useInvoiceStore((s) => s.buyer);
    const orders = useInvoiceStore((s) => s.orders);

    const taxableAmount = calculateTaxableAmount(orders);

    const cgstAmount = calculateGSTAmount(taxableAmount, invoice.cgst);
    const sgstAmount = calculateGSTAmount(taxableAmount, invoice.sgst);

    const totalBeforeRound =
        taxableAmount + cgstAmount + sgstAmount;

    const roundOff = roundOffAmount(totalBeforeRound);

    const grandTotal = totalBeforeRound + roundOff;

    const amountInWords =
        numberToWordsIN(Math.round(grandTotal)) + " Only";

    useEffect(() => {
        if (searchParams.get("print") === "true") {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [searchParams]);

    return (
        <>
            <div className="  preview_header w-full bg-[#0F2757] text-[#FCF1CF] flex justify-between p-5">
                <h1 className="text-3xl">GST Invoice Generator</h1>

                <div className="flex gap-5 items-center">
                    <a href="/">
                        <button className="flex items-center cursor-pointer uppercase gap-2 px-4 py-2 rounded-sm border border-[#FCF1CF] hover:bg-[#FCF1CF] hover:text-[#0F2757] hover:font-semibold transition-all">
                            <RiArrowLeftLine size={13} /> Go Back
                        </button>
                    </a>

                    <button onClick={() => window.print()} className="flex items-center cursor-pointer uppercase gap-2 px-4 py-2 rounded-sm border border-[#FCF1CF] hover:bg-[#FCF1CF] hover:text-[#0F2757] hover:font-semibold transition-all">
                        <RiPrinterLine size={13} /> Print
                    </button>

                </div>
            </div>
            <div className="preview_paren p-20 pt-10">
                <div className="w-[99.5%]  bg-white border border-black  leading-tight ">

                    {/* Header */}
                    <div className="border-b border-black pb-2 text-center">
                        <div className="border-b leading-none">
                            <h1 className=" py-2 font-bold leading-none">TAX INVOICE</h1>
                        </div>
                        <h2 className="text-xl font-extrabold mt-1">
                            JAY MAA RAJ RAJESHWARI ENTERPRISES
                        </h2>
                        <p>
                            Plot no. 37,38 Omkara Sewaniya Bhanpur-kokta Bypass Road<br />
                            Bhopal, Madhya Pradesh – 462010<br />
                            Contact No. 9826275661<br />
                            <span className="font-semibold">GST No. 23AIZPA2506L1Z7</span>
                        </p>
                    </div>

                    {/* Bill + Invoice Info */}
                    <div className="grid grid-cols-3 leading-none border-b border-black">
                        <p className=" col-span-2 py-1 font-semibold border-r pl-2">Bill To</p>
                        <div className="grid  grid-cols-2 text-center">
                            <p className="font-semibold py-1 border-r">Invoice No</p>
                            <p className="font-semibold py-1">Dated</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-black">
                        <div className=" col-span-2 border-r border-black p-2">
                            <p className="mt-1">
                                <span className="font-bold ">Name : </span> <span className="capitalize"> {buyer.companyName}</span><br />
                                {buyer.contact && (
                                    <>
                                        <span className="font-bold uppercase">Contact :  </span><span>{buyer.phone}</span><br />
                                    </>
                                )}
                                {buyer.email && (
                                    <>
                                        <span className="font-bold ">Email :  </span> {buyer.email}<br />
                                    </>
                                )}
                                {buyer.address && (
                                    <>
                                        <span className="font-bold ">Address :  </span> <span className="capitalize">{buyer.address}, {buyer.city}, {buyer.state}, {buyer.pincode}</span><br />
                                    </>
                                )}
                                {buyer.gst && (
                                    <>
                                        <span className="font-bold">GST No. : </span> <span>{buyer.gst}</span> <br />
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 text-center">
                            <div className="border-r center flex-col text-center border-black">
                                <p className="text-red-600 font-bold">{invoice.number}</p>
                            </div>
                            <div className=" center flex-col text-center font-semibold">
                                <p>{formatDate(invoice.date)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className=" leading-none grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] border-b border-black text-center font-semibold">
                        <div className="border-r border-black p-1 text-start! pl-2">Description of Service</div>
                        <div className="border-r border-black p-1">HSN</div>
                        <div className="border-r border-black p-1">QTY</div>
                        <div className="border-r border-black p-1">Units</div>
                        <div className="border-r border-black p-1">Rate</div>
                        <div className="p-1 pr-2 text-right">Amount</div>
                    </div>

                    {/* Table Rows */}
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr] border-b text-sm ${index !== orders.length - 1 ? "border-b border-black" : ""}`}            >
                            {/* Description */}
                            <div className={`p-2  border-r ${order.rate ===1 && "pb-0"} `}>
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

                            <div className="p-2 text-center border-r">
                              {order.rate !== 1 && order.rate !== 0 && order.hsn}
                            </div>

                            <div className="p-2 text-center border-r">
                                {
                                    order.rate !== 1 && order.quantity.toFixed(2)
                                }
                            </div>

                            <div className="p-2 text-center border-r">
                                {order.unit}
                            </div>

                            <div className="p-2 text-center border-r">
                                {order.rate !== 1 && (
                                    <span>₹ {order.rate} / {order.unit}</span>
                                )}
                            </div>

                            <div className="p-2 text-right  ">
                                ₹ {order.amount.toFixed(2)}
                            </div>

                        </div>
                    ))}

                    {/* Totals */}
                    <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr]">

                        {/* LEFT SIDE — Amount in Words */}
                        <div className="col-span-2 border-r border-black flex items-end p-2 font-semibold">
                            Amount in Words: <br />
                            {amountInWords}
                        </div>

                        {/* RIGHT SIDE — Amount Breakdown */}
                        <div className="col-span-4">

                            {/* Taxable Amount */}
                            <div className="grid grid-cols-4 border-b border-black">
                                <div className="p-2 col-span-3 font-semibold border-r border-black">
                                    Taxable Amount
                                </div>
                                <div className="p-2 text-right font-semibold">
                                    {formatCurrency(taxableAmount)}
                                </div>
                            </div>

                            {/* SGST */}
                            <div className="grid grid-cols-4 border-b border-black">
                                <div className="p-2 col-span-2 border-r border-black">
                                    ADD SGST
                                </div>
                                <div className="p-2 text-center border-r border-black">
                                    {invoice.cgst}%
                                </div>
                                <div className="p-2 text-right">
                                    {formatCurrency(sgstAmount)}
                                </div>
                            </div>

                            {/* CGST */}
                            <div className="grid grid-cols-4 border-b border-black">
                                <div className="p-2 col-span-2 border-r border-black">
                                    ADD CGST
                                </div>
                                <div className="p-2 text-center border-r border-black">
                                    {invoice.sgst}%
                                </div>
                                <div className="p-2 text-right">
                                    {formatCurrency(cgstAmount)}
                                </div>
                            </div>

                            {/* Round Off */}
                            <div className="grid grid-cols-4 border-b border-black">
                                <div className="p-2 col-span-2 border-r border-black">
                                    Round Off
                                </div>
                                <div className="p-2 text-center border-r border-black">
                                    –
                                </div>
                                <div className="p-2 text-right">
                                    {formatCurrency(roundOff)}
                                </div>
                            </div>

                            {/* Grand Total */}
                            <div className="grid grid-cols-4">
                                <div className="p-2 col-span-3 font-bold border-r border-black">
                                    Grand Total
                                </div>
                                <div className="p-2 text-right font-bold">
                                    {formatCurrency(grandTotal)}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="grid grid-cols-2 border-t border-black">
                        <div className=" flex justify-center flex-col border-r border-black p-2">
                            <p className="font-semibold mb-1">Bank Details:</p>
                            <div className="grid grid-cols-[55px_1fr] gap-y-1 ">
                                <span className="font-semibold">Name:</span>
                                <span>Jay Maa Raj Rajeshwari Enterprises</span>

                                <span className="font-semibold">Acc No:</span>
                                <span>4971002100004806</span>

                                <span className="font-semibold">IFSC:</span>
                                <span>PUNB0497100</span>

                                <span className="font-semibold">Bank:</span>
                                <span>Punjab National Bank</span>

                                <span className="font-semibold">Branch:</span>
                                <span>Ayodhya Nagar, Bhopal (M.P)</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end justify-end p-2">
                            <div className=" flex items-end justify-end ">
                                <img className="h-32" src="/image.png" alt="" />
                            </div>
                            <p className="font-semibold">Authorized Signatory</p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default PreviewPage;
