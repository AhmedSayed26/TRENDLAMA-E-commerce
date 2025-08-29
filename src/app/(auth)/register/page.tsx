"use client";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    // Simple email validation with typical pattern
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setEmailValid(pattern.test(email));
  }, [email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!emailValid) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!name.trim()) {
        setError("Name is required.");
        return;
      }
      await register(name.trim(), email, password);
      router.push("/");
    } catch {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="ring-1 ring-gray-300 rounded-md px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={`ring-1 rounded-md px-3 py-2 ${email && !emailValid ? "ring-red-500" : "ring-gray-300"}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!emailValid && email && (
          <p className="text-sm text-red-600">Please enter a valid email (e.g., 2ahmed23@gmail.com).</p>
        )}
        <input
          type="password"
          placeholder="Password"
          className="ring-1 ring-gray-300 rounded-md px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-800 text-white px-4 py-2 rounded-md disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className="text-sm mt-4">
        Already have an account? {" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}




