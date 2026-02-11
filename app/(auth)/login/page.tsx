"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";





export default function LoginPage() {

	const router = useRouter();
	// State untuk menampung inputan user
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Tambahkan logika autentikasi di sini

		const data = { email, password };

		// buat respnse ke api login
		try {
			const response = await fetch("http://localhost:8080/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (response.ok) {
				alert("Login berhasil!");
				// Redirect atau lakukan sesuatu setelah login berhasil, push ke products
				router.push("/products");
			} else {
				// 1. Kita ambil teks kiriman dari Backend (misal: "Email atau password salah")
				const msg = await response.text();	
				// 2. Kita tampilkan ke user supaya mereka nggak bingung
				alert("Gagal login: " + msg);
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
				<h2 className="text-2xl font-semibold text-zinc-900 mb-6">Login</h2>

				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Username atau Email"
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
						Login
					</button>
				</form>
				<p className="mt-4 text-sm text-zinc-600">
					Belum punya akun?{" "}
					<Link href="/register" className="text-zinc-900 underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
