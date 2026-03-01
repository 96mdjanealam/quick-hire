"use client";

import { logoutAction } from "@/app/actions/auth";
import React from "react";

const LogoutBtn = () => {
  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-primary cursor-pointer text-white px-5 md:px-7 py-2.5 md:py-3 rounded-[4px] font-semibold text-sm md:text-base hover:bg-primary-hover transition-all transform hover:-translate-y-px active:translate-y-0"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
