"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteJobAction } from "@/app/actions/jobActions";

export default function DeleteJobButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    setLoading(true);
    const result = await deleteJobAction(id);

    if (result.error) {
      alert(result.error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50"
      title="Delete Job"
    >
      <Trash2 size={16} />
    </button>
  );
}
