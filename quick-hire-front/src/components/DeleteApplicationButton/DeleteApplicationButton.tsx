"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteApplicationAction } from "@/app/actions/applicationActions";

export default function DeleteApplicationButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    setLoading(true);
    const result = await deleteApplicationAction(id);

    if (result.error) {
      alert(result.error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-semibold"
      title="Delete Application"
    >
      <Trash2 size={16} />
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
