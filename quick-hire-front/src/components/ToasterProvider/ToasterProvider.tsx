"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "8px",
          background: "#ffffff",
          color: "#1a1a1a",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          iconTheme: {
            primary: "#4338CA",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
