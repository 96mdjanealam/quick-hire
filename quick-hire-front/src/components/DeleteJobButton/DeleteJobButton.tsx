"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteJobAction } from "@/app/actions/jobActions";
import toast from "react-hot-toast";

export default function DeleteJobButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">Delete this job?</p>
          <p className="text-sm opacity-80">This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm text-background rounded-md bg-zinc-600 hover:bg-zinc-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setLoading(true);
                const result = await deleteJobAction(id);
                if (result.error) {
                  toast.error(result.error);
                } else {
                  toast.success("Job deleted successfully!");
                }
                setLoading(false);
              }}
              className="px-3 py-1.5 text-sm rounded-md bg-red-500 hover:bg-red-600 transition-colors text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        id: `delete-job-${id}`,
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
      className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50"
      title="Delete Job"
    >
      <Trash2 size={16} />
    </button>
  );
}
