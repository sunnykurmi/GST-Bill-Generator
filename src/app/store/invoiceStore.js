"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useInvoiceStore = create(
  persist(
    (set) => ({
      invoice: {
        number: "",
        date: "",
        cgst: "9",
        sgst: "9",
      },

      buyer: {
        companyName: "",
        gst: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: "",
      },

      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),

      updateOrder: (index, key, value) =>
        set((s) => ({
          orders: s.orders.map((order, i) =>
            i === index ? { ...order, [key]: value } : order
          ),
        })),

      removeOrder: (index) =>
        set((s) => ({
          orders: s.orders.filter((_, i) => i !== index),
        })),

      updateInvoice: (key, value) =>
        set((s) => ({
          invoice: { ...s.invoice, [key]: value },
        })),

      updateBuyer: (key, value) =>
        set((s) => ({
          buyer: { ...s.buyer, [key]: value },
        })),

      reset: () =>
        set({
          invoice: {
            number: "",
            date: "",
            cgst: "9",
            sgst: "9",
          },
          buyer: {
            companyName: "",
            gst: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            email: "",
          },
          orders: [],
        }),
        
    }),
    { name: "gst-invoice-data" }
  )
);

export default useInvoiceStore;