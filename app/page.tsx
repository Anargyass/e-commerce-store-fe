"use client";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import AddProductModal from "../components/AddProductModal";

type Product = {
  id: number;
  name: string;
  price: number;
};

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("http://localhost:8080/api/products", {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as Product[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [items, setItems] = useState<Product[]>([]);
  const loadProducts = async () => {
    const data = await getProducts();
    setItems(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
  const response = await fetch(
    `http://localhost:8080/api/products?id=${id}`, // Ini format Query String sesuai Go kita
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    await loadProducts();
  }
};

  
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">
                List Barang
              </h1>
              <p className="text-zinc-600">
                Kelola produk dengan tombol tambah dan hapus.
              </p>
            </div>
            <AddProductModal onCreated={loadProducts} />
          </div>
        </header>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-500">
            <span className="w-1/5">ID</span>
            <span className="w-1/2">Nama Barang</span>
            <span className="w-1/5 text-right">Harga</span>
            <span className="w-24 text-right">Aksi</span>
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-sm text-zinc-500">
              Data belum tersedia.
            </div>
          ) : (
            items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-4 text-base shadow-sm"
            >
              <span className="w-1/5 font-medium text-zinc-700">{item.id}</span>
              <span className="w-1/2 text-zinc-900">{item.name}</span>
              <span className="w-1/5 text-right font-semibold text-zinc-900">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
              <div className="flex w-24 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </Button>
              </div>
            </div>
            ))
          )}
        </section>
      </main>

      

    </div>
  );
}
