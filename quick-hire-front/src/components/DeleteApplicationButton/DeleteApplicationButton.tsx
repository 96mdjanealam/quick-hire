"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteApplicationAction } from "@/app/actions/applicationActions";
import toast from "react-hot-toast";

export default function DeleteApplicationButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">Delete this application?</p>
          <p className="text-sm opacity-80">This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm text-background rounded-[4px] bg-zinc-600 hover:bg-zinc-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setLoading(true);
                const result = await deleteApplicationAction(id);
                if (result.error) {
                  toast.error(result.error);
                } else {
                  toast.success("Application deleted successfully!");
                }
                setLoading(false);
              }}
              className="px-3 py-1.5 text-sm rounded-[4px] bg-red-500 hover:bg-red-600 transition-colors text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        id: `delete-application-${id}`,
        duration: 3000,
        style: {
          maxWidth: "360px",
        },
      },
    );
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-red-50 cursor-pointer text-red-600 rounded-[4px] hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-semibold"
      title="Delete Application"
    >
      <Trash2 size={16} />
    </button>
  );
}
