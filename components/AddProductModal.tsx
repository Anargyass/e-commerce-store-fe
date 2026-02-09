"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "./Button";

type AddProductModalProps = {
  onCreated: () => Promise<void>;
};

type ProductForm = {
  name: string;
  price: string;
};

export default function AddProductModal({ onCreated }: AddProductModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ProductForm>({ name: "", price: "" });

  const handleChange = (field: keyof ProductForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.price) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          price: Number(form.price),
        }),
      });

      if (response.ok) {
        setForm({ name: "", price: "" });
        setIsOpen(false);
        await onCreated();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button type="button" size="lg" onClick={() => setIsOpen(true)}>
        + Tambah Produk
      </Button>

      {isOpen ? (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900">
                  Tambah Produk
                </h2>
                <p className="text-sm text-zinc-500">
                  Isi data produk baru di bawah ini.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-zinc-400 transition hover:text-zinc-600"
              >
                ✕
              </button>
            </div>

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
                Nama Barang
                <input
                  type="text"
                  placeholder="Contoh: Mouse Wireless"
                  value={form.name}
                  onChange={(event) =>
                    handleChange("name", event.target.value)
                  }
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
                Harga
                <input
                  type="number"
                  placeholder="Contoh: 250000"
                  value={form.price}
                  onChange={(event) =>
                    handleChange("price", event.target.value)
                  }
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
                />
              </label>

              <div className="mt-2 flex flex-wrap justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
}
