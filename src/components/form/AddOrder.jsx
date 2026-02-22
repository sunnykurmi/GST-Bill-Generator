"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";
import { RiCloseLine, RiDeleteBin2Line } from "@remixicon/react";
import useInvoiceStore from "@/app/store/invoiceStore";

const UNIT_RATES = {
    "": 1,
    "sq.ft": 1,
    piece: 1,
    "running.ft": 1,
};

const SERVICES = [
    { name: "Paver Block Cosmic 60mm", itsDivider: 1.8 },
    { name: "Paver Block Combo 60mm", itsDivider: 2.2 },
    { name: "Paver Block Zig-Zag 80mm", itsDivider: 2.8 },
    { name: "Paver Block (6 X 12) 60mm", itsDivider: 2 },
    { name: "Concrete Naali", itsDivider: 1 },
    { name: "Concrete Curvestone", itsDivider: 1 },
    { name: "Precast Boundary Wall", itsDivider: 1 },
];

const AddOrder = ({ setOpenForm, editIndex, setEditIndex }) => {

    const orders = useInvoiceStore((s) => s.orders);
    const addOrder = useInvoiceStore((s) => s.addOrder);
    const updateOrder = useInvoiceStore((s) => s.updateOrder);

    const [hsn, setHsn] = useState("7016");
    const [unit, setUnit] = useState("sq.ft");
    const [rate, setRate] = useState(UNIT_RATES["sq.ft"]);
    const [divider, setDivider] = useState("1");
    const [height, setHeight] = useState(1);

    
    const [serviceName, setServiceName] = useState(SERVICES[0].name);
    const [customService, setCustomService] = useState("");
    
    const isBoundaryWall = serviceName === "Precast Boundary Wall";

    const [descriptions, setDescriptions] = useState([
        { label: "", value: "" },
    ]);

    const serviceOptions = [
        ...SERVICES.map((service) => ({
            label: service.name,
            value: service.name,
            itsDivider: service.itsDivider,
        })),
        {
            label: "Custom Description",
            value: "custom",
        },
    ];

    const handleServiceChange = (value) => {
        setServiceName(value);

        if (value === "custom") {
            setDivider("1");
            setCustomService("");
            setHeight(1);
        } else {
            const selected = SERVICES.find((s) => s.name === value);
            setDivider(selected?.itsDivider || 1);

            if (value === "Precast Boundary Wall") {
                setHeight(6);
            } else {
                setHeight(1);
            }
        }
    };

    const totalValue = descriptions.reduce(
        (sum, item) => sum + (Number(item.value) || 0),
        0
    );

const quantity = isBoundaryWall
  ? totalValue * height
  : divider && totalValue
    ? totalValue / Number(divider)
    : 0;

    const amount = quantity * rate;

    const handleUnitChange = (val) => {
        setUnit(val);
        setRate(UNIT_RATES[val]);
    };

    const updateDescription = (index, key, val) => {
        const updated = [...descriptions];
        updated[index][key] = val;
        setDescriptions(updated);
    };

    const addDescription = () => {
        setDescriptions([...descriptions, { label: "", value: "" }]);
    };

    const removeDescription = (index) => {
        setDescriptions(descriptions.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        const orderData = {
            serviceName: serviceName === "custom" ? customService : serviceName,
            hsn,
            unit,
            rate,
            divider,
            height,
            descriptions,
            totalValue,
            quantity,
            amount,
        };

        if (editIndex !== null) {
            Object.keys(orderData).forEach((key) => {
                updateOrder(editIndex, key, orderData[key]);
            });
            setEditIndex(null);
        } else {
            addOrder(orderData);
        }

        setOpenForm(false);
    };


useEffect(() => {
  if (editIndex !== null) {
    const o = orders[editIndex];
    if (!o) return;

    setServiceName(o.serviceName);
    setHsn(o.hsn);
    setUnit(o.unit);
    setRate(o.rate);
    setDivider(o.divider);
    setHeight(o.height ?? 1); // ✅ safe default
    setDescriptions(o.descriptions);
  }
}, [editIndex]);

    return (
        <div className="w-full h-screen  fixed top-0 left-0 center bg-white/50 backdrop-blur-xs">

                <div onClick={() => setOpenForm(false)} className="absolute z-10  top-5 bg-[#0F2757] shrink-0 text-[#FCF1CF] size-8 center rounded-full aspect-square right-5 cursor-pointer"><RiCloseLine /></div>



            <div className=" w-[90%] md:w-[80%] max-sm:h-[80vh] max-sm:overflow-y-scroll relative bg-white border border-black/20 rounded-xl p-5 space-y-6">

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <CustomSelect
                        label="SERVICE NAME"
                        value={serviceName}
                        onChange={handleServiceChange}
                        options={serviceOptions}
                    />

                    {isBoundaryWall && (
                        <CustomInput
                            label="HEIGHT (ft)"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value) || 0)}
                        />
                    )}
                    {serviceName === "custom" && (
                        <CustomInput
                            label="CUSTOM SERVICE DESCRIPTION"
                            value={customService}
                            onChange={(e) => setCustomService(e.target.value)}
                            placeholder="Enter service description"
                        />
                    )}

                    <CustomSelect
                        label="UNIT TYPE"
                        value={unit}
                        onChange={handleUnitChange}
                        options={[
                            { label: "none", value: "" },
                            { label: "Sq.Ft", value: "sq.ft" },
                            { label: "Piece", value: "piece" },
                            { label: "Running Ft", value: "running.ft" },
                        ]}
                    />
                    <CustomInput
                        label={`RATE (Rs / ${unit})`}
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        type="number"
                    />

                    <CustomInput
                        label="DIVISIBLE NUMBER"
                        value={divider}
                        onChange={(e) => setDivider(e.target.value)}
                        type="number"
                    />

                    <CustomInput
                        label="HSN CODE"
                        value={hsn}
                        onChange={(e) => setHsn(e.target.value)}
                    />
                </div>

                {/* Description Rows */}
                <div>
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                        DESCRIPTION DETAILS
                    </p>

                    <div className={`space-y-3 max-h-52 pr-4 ${descriptions.length > 3 ? "overflow-y-scroll" : ""}`}>
                        {descriptions.map((item, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-[2fr_1fr_auto] gap-4 items-end"
                            >
                                {/* Description text */}
                                <CustomInput
                                    placeholder="Description Of Material, Bill No., Measurements"
                                    value={item.label}
                                    onChange={(e) =>
                                        updateDescription(i, "label", e.target.value)
                                    }
                                />

                                {/* Numeric value */}
                                <CustomInput
                                    placeholder="No. of Items, Total Measurement"
                                    type="number"
                                    value={item.value}
                                    onChange={(e) =>
                                        updateDescription(i, "value", e.target.value)
                                    }
                                />

                                {/* Delete */}
                                <button
                                    type="button"
                                    onClick={() => removeDescription(i)}
                                    className={`
            px-4 py-[.95rem] flex items-center cursor-pointer justify-center
            rounded-lg border
            transition border-red-200 text-red-500 hover:bg-red-50
          `}
                                >
                                    <RiDeleteBin2Line size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addDescription}
                        className="mt-3 text-sm font-semibold text-[#0F2757] cursor-pointer hover:underline"
                    >
                        + Add More
                    </button>
                </div>

                {/* Calculated Output */}
                <div className="grid grid-cols-3 gap-5 pt-4 border-t">
                    <div>
                        <p className="text-sm text-slate-500">TOTAL VALUE</p>
                        <p className="font-bold">{totalValue}</p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">QUANTITY</p>
                        <p className="font-bold">
                            {quantity.toFixed(2)} {unit}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">AMOUNT</p>
                        <p className="font-bold text-lg">
                            ₹ {amount.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="w-full center">
                    <button onClick={handleSubmit} className='flex items-center uppercase gap-2 px-4 py-2 rounded-sm border border-[#0F2757] hover:bg-[#0F2757] hover:text-[#FCF1CF] font-semibold cursor-pointer transition-all duration-300 '>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddOrder;