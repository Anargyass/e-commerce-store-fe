"use client"; // Wajib di Next.js App Router untuk form interaktif
import { useState } from "react";

export default function RegisterPage() {
    // State untuk menampung inputan user
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Membungkus data sesuai format JSON yang diminta backend Go
        const data = { username, email, password };

        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Akun berhasil dibuat! Sekarang silakan login.");
            } else {
                alert("Gagal daftar. Username/Email mungkin sudah dipakai.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan koneksi ke server.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6 py-12">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-zinc-900">
                <span className="text-zinc-500 text-sm">welcome to toko apalah ini</span>
                <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Create Account</h2>
                
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 transition-colors"
                    >   
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}