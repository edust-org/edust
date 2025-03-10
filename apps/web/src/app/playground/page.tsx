"use client"

import { AccountType } from "@/types"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"

import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("organizer@example.com")
  const [password, setPassword] = useState("password2024")
  const [error, setError] = useState("")
  const { data, status } = useSession()

  console.log({ data, status })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Reset error

    const result = await signIn(AccountType.LOCAL, {
      email,
      password,
      redirect: false, // Don't automatically redirect
    })

    if (result?.error) {
      setError("Invalid email or password")
    } else {
      // window.location.href = "/dashboard" // Redirect on success
    }
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <h2 className="mb-4 text-xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 w-full border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 w-full border p-2"
          required
        />
        <button type="submit" className="w-full bg-blue-500 p-2 text-white">
          Login
        </button>
      </form>
    </div>
  )
}
